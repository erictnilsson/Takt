package takt.websocket;

import takt.models.Room;
import takt.models.User;
import takt.models.enums.WebsocketMessageType;
import takt.models.messages.WebsocketMessage;
import takt.models.simples.SimplePlaybackContext;
import takt.models.simples.SimpleUserActivity;
import takt.repositories.RoomRepository;
import takt.repositories.UserRepository;
import takt.utilities.jwt.JwtTokenUtil;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Component
@CrossOrigin
public class WebsocketEventListener implements ApplicationListener<SessionConnectEvent> {
    private static final Logger LOGGER = Logger.getLogger(WebsocketEventListener.class.getName());
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public WebsocketEventListener(SimpMessagingTemplate messagingTemplate, UserRepository userRepository,
                                  RoomRepository roomRepository, JwtTokenUtil jwtTokenUtil) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void onApplicationEvent(SessionConnectEvent connect) {
        // Fetch headers and token
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(connect.getMessage());
        final String token = headerAccessor.getFirstNativeHeader("token");
        final String sessionId = headerAccessor.getSessionId();
        String userId = null;

        if (token != null && !token.equals("null")) {
            try {
                userId = jwtTokenUtil.getId(token);
                User user = userRepository.getWithId(userId);
                user.setSessionId(sessionId);
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Problem fetching token for " + userId + ": " + e.getMessage(), e);
            }

        } else {
            LOGGER.log(Level.WARNING, "CONNECTING ERROR: No token found in the connecting message's header", headerAccessor);
        }

        if (userId != null && userId.length() > 0) {
            // Set the connecting user's session Id from the connection event
            userRepository.getWithId(userId).setSessionId(sessionId);
        } else {
            LOGGER.log(Level.WARNING, "CONNECTING ERROR: No userId provided in the connecting message's header", headerAccessor);
        }
    }

    @EventListener
    public void onSocketDisconnect(SessionDisconnectEvent disconnect) {
       /* final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(disconnect.getMessage());
        final String userSessionId = headerAccessor.getSessionId();

        User user = userRepository.getWithSessionId(userSessionId);
        if (user != null) {

            // Paus the user's playback
            if (user.getPlayer().isPlaying()) {
                user.getPlayer().setPlaying(false);
                try {
                    user.getPlayer().pausPlayback();
                } catch (IOException | SpotifyWebApiException e) {
                    LOGGER.log(Level.SEVERE, "Could not paus playback for " + user.getDisplayName() + ": " + e.getMessage(), e);
                }
            }
            // Remove the user from the room
            Room room = user.getRoom();
            room.removeUser(userSessionId);
            user.setRoom(null);
            messagingTemplate.convertAndSend("/room/" + room.getId(), new WebsocketMessage(WebsocketMessageType.UNSUBSCRIBE, ""));
        } else {
            LOGGER.log(Level.WARNING, "DISCONNECT ERROR: Could not find a user with the provided sessionId", headerAccessor);
        }*/
    }

    @EventListener
    public void onSocketUnsubscribe(SessionUnsubscribeEvent unsubscribe) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(unsubscribe.getMessage());
        final String userSessionId = headerAccessor.getSessionId();

        User user = userRepository.getWithSessionId(userSessionId);
        if (user != null) {
            // Paus the user's playback
            if (user.getPlayer().isPlaying()) {
                user.getPlayer().setPlaying(false);
                try {
                    user.getPlayer().pausPlayback();
                } catch (IOException | SpotifyWebApiException e) {
                    LOGGER.log(Level.SEVERE, "Could not paus playback for " + user.getDisplayName() + ": " + e.getMessage(), e);
                }
            }
            // Remove the user from the room
            Room room = user.getRoom();
            room.removeUser(userSessionId);
            user.setRoom(null);
            messagingTemplate.convertAndSend("/room/" + room.getId(), new WebsocketMessage(WebsocketMessageType.UNSUBSCRIBE, ""));
        } else {
            LOGGER.log(Level.WARNING, "UNSUBSCRIBE ERROR: Could not find a user with the provided sessionId", headerAccessor);
        }
    }

    @EventListener
    public void onSocketSubscribe(SessionSubscribeEvent subscribe) throws InterruptedException {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(subscribe.getMessage());
        // Get destination (room id)
        final String destination = headerAccessor.getDestination();

        if (destination != null && destination.startsWith("/room/")) {
            final String userSessionId = headerAccessor.getSessionId();

            if (userSessionId != null && userSessionId.length() > 0) {
                // Get the User and the Room, connect the two
                User user = userRepository.getWithSessionId(userSessionId);
                final String roomId = destination.substring(destination.lastIndexOf('/') + 1);
                Room room = roomRepository.get(roomId);

                if (user != null && room != null) {
                    room.addUser(user);
                    user.setRoom(room);
                    user.getPlayer().setActiveDevice();

                    // If the room has an active playback, send the playback context to the subscribing user
                    if (room.getPlayer().isPlaying()) {
                        final int positionMs = (int) System.currentTimeMillis() - room.getPlayer().getTimestamp();
                        sendPrivateMessage(WebsocketMessageType.CURRENT_TRACK, new SimplePlaybackContext(room.getPlayer().getCurrentTrack(), positionMs), user);

                    }

                    // Notify the room of the room's users
                    messagingTemplate.convertAndSend(destination, new WebsocketMessage(WebsocketMessageType.SUBSCRIBE, getUsersInRoom(room)));

                    // Ensure that the subscription-channel has time to establish before sending the message
                    // TODO: Too hacky, change in future
                    Thread.sleep(300);

                    // Lastly, send the room's track queue privately to the subscribing user
                    // Also, send the user's available devices privately
                    sendPrivateMessage(WebsocketMessageType.SEND_QUEUE, room.getPlayer().getQueue(), user);
                    sendPrivateMessage(WebsocketMessageType.GET_DEVICES, user.getPlayer().getAvailableDevices(), user);
                } else {
                    LOGGER.log(Level.SEVERE, "SUBSCRIBE ERROR: No room or user found");
                }
            } else {
                LOGGER.log(Level.WARNING, "SUBSCRIBE ERROR: Could not find a session id from the event", headerAccessor);

            }
        }
    }

    private List<SimpleUserActivity> getUsersInRoom(Room room) {
        List<SimpleUserActivity> users;

        users = room.getAllUsers().stream()
                .map((user -> new SimpleUserActivity(user.getDisplayName(), user.getPlayer().isPlaying())))
                .collect(Collectors.toList());
        return users;
    }

    private void sendPrivateMessage(WebsocketMessageType messageType, Object message, User user) {
        try {
            SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor
                    .create(SimpMessageType.MESSAGE);
            headerAccessor.setSessionId(user.getSessionId());
            headerAccessor.setLeaveMutable(true);

            messagingTemplate.convertAndSendToUser(user.getSessionId(), "/queue/private",
                    new WebsocketMessage(messageType, message),
                    headerAccessor.getMessageHeaders());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}