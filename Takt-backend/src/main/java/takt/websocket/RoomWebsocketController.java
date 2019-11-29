package takt.websocket;

import takt.models.Room;
import takt.apiHandling.RoomPlayer;
import takt.models.enums.WebsocketMessageType;
import takt.models.messages.WebsocketMessage;
import takt.models.simples.SimpleTrack;
import takt.repositories.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import takt.services.TrackQueueScheduler;

@Controller
public class RoomWebsocketController {
    private final SimpMessagingTemplate messagingTemplate;
    private final TrackQueueScheduler trackQueueScheduler;
    private final RoomRepository roomRepository;

    public RoomWebsocketController(SimpMessagingTemplate messagingTemplate, TrackQueueScheduler trackQueueScheduler, RoomRepository roomRepository) {
        this.messagingTemplate = messagingTemplate;
        this.trackQueueScheduler = trackQueueScheduler;
        this.roomRepository = roomRepository;
    }

    //TODO: Fix global CrossOriginsPolicy
    @CrossOrigin(origins = "*")
    @MessageExceptionHandler
    @SendToUser("/queue/error")
    public WebsocketMessage handleError(Exception e) {
        return new WebsocketMessage(WebsocketMessageType.ERROR,
                e.getMessage());
    }

    @CrossOrigin(origins = "*")
    @MessageMapping("/room/{id}/queue_track")
    @SendTo("/room/{id}")
    public WebsocketMessage queueTrack(@DestinationVariable String id, SimpleTrack track) {
        final Room room = roomRepository.get(id);
        final RoomPlayer player = room.getPlayer();
        // Add track to queue
        player.addTrackToQueue(track);
        // If the player is not active, play the track queue
        if (!player.isPlaying())
            trackQueueScheduler.scheduleTrackQueue(id);

        return new WebsocketMessage(WebsocketMessageType.SEND_QUEUE, player.getQueue());
    }
}
