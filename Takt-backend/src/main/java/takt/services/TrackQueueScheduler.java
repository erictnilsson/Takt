package takt.services;

import takt.models.Room;
import takt.models.enums.WebsocketMessageType;
import takt.models.messages.WebsocketMessage;
import takt.models.simples.SimplePlaybackContext;
import takt.repositories.RoomRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class TrackQueueScheduler {
    private static final Logger LOGGER = Logger.getLogger(TrackQueueScheduler.class.getName());
    private final SimpMessagingTemplate messagingTemplate;
    private final RoomRepository roomRepository;

    public TrackQueueScheduler(SimpMessagingTemplate messagingTemplate, RoomRepository roomRepository) {
        this.messagingTemplate = messagingTemplate;
        this.roomRepository = roomRepository;
    }

    public void scheduleTrackQueue(String roomId) {
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

        Runnable queueTask = new Runnable() {
            @Override
            public void run() {
                try {
                    Room room = roomRepository.get(roomId);
                    if (room != null) {
                        // Play the room's track queue and fetch the current track's duration in ms
                        room.getPlayer().play();
                        int trackDurationMs = room.getPlayer().getCurrentTrackDurationMs();

                        // Send messages to the room
                        sendMessageToRoom(roomId, new WebsocketMessage(WebsocketMessageType.CURRENT_TRACK,
                                new SimplePlaybackContext(room.getPlayer().getCurrentTrack(), 305)));

                        sendMessageToRoom(roomId, new WebsocketMessage(WebsocketMessageType.SEND_QUEUE,
                                room.getPlayer().getQueue()));
                        // If there is a track that's playing, then
                        // schedule the executorService to execute a new queueTask after the current track's duration in ms
                        if (trackDurationMs > 0) {
                            scheduleNext(trackDurationMs);
                        } else {
                            LOGGER.log(Level.WARNING, "There is no track to queue for room " + roomId);
                        }
                    }
                } catch (Exception e) {
                    LOGGER.log(Level.SEVERE, "Queue task threw " + e.getMessage(), e);
                }
            }

            private void scheduleNext(int durationMs) {
                executorService.schedule(this, durationMs, TimeUnit.MILLISECONDS);
            }
        };
        executorService.execute(queueTask);
    }


    private void sendMessageToRoom(String roomId, WebsocketMessage message) {
        try {
            messagingTemplate.convertAndSend("/room/" + roomId, message);
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Could not send message to room " + roomId + ": " + e.getMessage(), e);
        }
    }
}
