package takt.websocket;

import takt.models.Room;
import takt.models.User;
import takt.apiHandling.UserPlayer;
import takt.models.enums.WebsocketMessageType;
import takt.models.messages.WebsocketMessage;
import takt.models.simples.SimpleDevice;
import takt.models.simples.SimplePlaybackContext;
import takt.models.simples.SimpleUserActivity;
import takt.repositories.UserRepository;
import takt.utilities.Utils;
import com.wrapper.spotify.enums.ModelObjectType;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.special.SearchResult;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.logging.Logger;

@Controller
@CrossOrigin
public class PrivateWebsocketController {
    private static final Logger LOGGER = Logger.getLogger(PrivateWebsocketController.class.getName());
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;

    public PrivateWebsocketController(SimpMessagingTemplate messagingTemplate, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }

    @MessageExceptionHandler
    @SendToUser("/queue/error")
    public WebsocketMessage handleError(Exception e) {
        return new WebsocketMessage(WebsocketMessageType.ERROR,
                e.getMessage());
    }

    @MessageMapping("/private/play")
    @SendToUser("/queue/private")
    public WebsocketMessage startUserPlayback(WebsocketMessage message, SimpMessageHeaderAccessor messageHeaderAccessor) throws Exception {
        final String userSessionId = messageHeaderAccessor.getSessionId();

        final User user = userRepository.getWithSessionId(userSessionId);
        final Room room = user.getRoom();
        final UserPlayer player = user.getPlayer();

        // If the room has an active playback
        if (room.getPlayer().isPlaying()) {
            // Assign a position in ms based from the playback timestamp
            int positionMs = (int) System.currentTimeMillis() - room.getPlayer().getTimestamp();
            // Start the playback with the room's track queue context and the positionMs
            player.startResumePlayback(room.getPlayer().getTrackQueueUris(), positionMs);
            player.setPlaying(true);

            // Send message to the user's room that he/she is actively listening to the shared playback
            notifyRoomOfActivity(user, true);

            // Return the user's current playback context
            SimplePlaybackContext playbackContext = new SimplePlaybackContext(room.getPlayer().getCurrentTrack(), positionMs);
            return new WebsocketMessage(WebsocketMessageType.CURRENT_TRACK, playbackContext);
        } else {
            throw new Exception("No active playback available");
        }
    }

    @MessageMapping("/private/paus")
    public void pausUserPlayback(WebsocketMessage message, SimpMessageHeaderAccessor messageHeaderAccessor) throws IOException, SpotifyWebApiException {
        final String userSessionId = messageHeaderAccessor.getSessionId();

        final User user = userRepository.getWithSessionId(userSessionId);
        final Room room = user.getRoom();
        final UserPlayer player = user.getPlayer();

        // If the room has an active playback then paus the user's playback
        if (room.getPlayer().isPlaying()) {
            player.pausPlayback();
            player.setPlaying(false);

            // Send message to the user's room that he/she is not actively listening to the shared playback anymore
            notifyRoomOfActivity(user, false);
        }
    }

    @MessageMapping("/private/search")
    @SendToUser("/queue/private")
    public WebsocketMessage searchTrack(WebsocketMessage message, SimpMessageHeaderAccessor messageHeaderAccessor) throws IOException, SpotifyWebApiException {
        final String userSessionId = messageHeaderAccessor.getSessionId();

        final User user = userRepository.getWithSessionId(userSessionId);
        final UserPlayer player = user.getPlayer();

        final SearchResult result = player.searchItem(message.getContent().toString(), ModelObjectType.TRACK);
        return new WebsocketMessage(WebsocketMessageType.TRACK_RESULT, Utils.simplifyTrackResult(result));
    }

    @MessageMapping("/private/get_playback_context")
    @SendToUser("/queue/private")
    public WebsocketMessage getUserPlaybackContext(WebsocketMessage message, SimpMessageHeaderAccessor messageHeaderAccessor) {
        final String userSessionId = messageHeaderAccessor.getSessionId();

        final User user = userRepository.getWithSessionId(userSessionId);
        final Room room = user.getRoom();
        final int positionMs = (int) System.currentTimeMillis() - room.getPlayer().getTimestamp();

        return new WebsocketMessage(WebsocketMessageType.CURRENT_TRACK, new SimplePlaybackContext(room.getPlayer().getCurrentTrack(), positionMs));
    }

    @MessageMapping("/private/get_available_devices")
    @SendToUser("/queue/private")
    public WebsocketMessage getAvailableDevices(WebsocketMessage message, SimpMessageHeaderAccessor messageHeaderAccessor) {
        final String userSessionId = messageHeaderAccessor.getSessionId();
        final User user = userRepository.getWithSessionId(userSessionId);

        return new WebsocketMessage(WebsocketMessageType.GET_DEVICES, user.getPlayer().getAvailableDevices());
    }

    @MessageMapping("/private/set_device")
    @SendToUser("/queue/private")
    public void setDevice(SimpleDevice device, SimpMessageHeaderAccessor messageHeaderAccessor) throws Exception {
        final String userSessionId = messageHeaderAccessor.getSessionId();
        final User user = userRepository.getWithSessionId(userSessionId);
        user.getPlayer().setActiveDevice(device);
        if (user.getPlayer().isPlaying() && user.getRoom().getPlayer().isPlaying()) {
            user.getPlayer().transferPlayback(device.getId());
        }
    }

    private void notifyRoomOfActivity(User user, boolean isActive) {
        SimpleUserActivity memberActivity = new SimpleUserActivity(user.getDisplayName(), isActive);
        sendMessageToRoom(user.getRoom().getId(), new WebsocketMessage(WebsocketMessageType.IS_ACTIVE, memberActivity));
    }

    private void sendMessageToRoom(String roomId, WebsocketMessage message) {
        messagingTemplate.convertAndSend("/room/" + roomId, message);
    }
}

