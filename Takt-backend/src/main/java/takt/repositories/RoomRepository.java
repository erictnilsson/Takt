package takt.repositories;

import takt.models.Room;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@Repository
public class RoomRepository {
    private static final Logger LOGGER = Logger.getLogger(RoomRepository.class.getName());
    private final Map<String, Room> roomMap; // Map<id, Room>

    public RoomRepository() {
        roomMap = new ConcurrentHashMap<>();
    }

    public void add(Room room) {
        if (isPresent(room.getId()))
            roomMap.replace(room.getId(), room);
        else
            roomMap.put(room.getId(), room);
    }

    public Room get(String id) {
        return roomMap.get(id);
    }

    public void remove(String id) {
        roomMap.remove(id);
    }

    public boolean isPresent(String roomId) {
        return roomMap.containsKey(roomId);
    }
}