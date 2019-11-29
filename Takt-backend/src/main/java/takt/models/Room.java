package takt.models;

import takt.apiHandling.RoomPlayer;
import takt.utilities.Utils;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Room {
    private static final Logger LOGGER = Logger.getLogger(Room.class.getName());
    private final String id;
    private final Map<String, User> userMap; // <sessionId, User>
    private final RoomPlayer player;

    public Room() {
        this.id = Utils.generateRandomString(9);
        userMap = new ConcurrentHashMap<>();
        this.player = new RoomPlayer(this);
    }

    public String getId() {
        return id;
    }

    public void addUser(User user) {
        String sessionId = user.getSessionId();

        if (!isPresent(user))
            userMap.putIfAbsent(sessionId, user);
        else {
            userMap.replace(sessionId, user);
            LOGGER.log(Level.WARNING, "replaced " + user.getDisplayName() + " with a present user in room " + id, user);
        }
    }

    public User getUser(String sessionId) {
        return userMap.get(sessionId);
    }

    public void removeUser(String sessionId) {
        userMap.remove(sessionId);
    }

    public ArrayList<User> getAllUsers() {
        System.out.println(userMap.values());
        return new ArrayList<>(userMap.values());
    }

    public RoomPlayer getPlayer() {
        return player;
    }

    private boolean isPresent(User user) {
        return userMap.containsKey(user.getSessionId());
    }
}
