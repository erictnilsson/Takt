package takt.models;

import takt.apiHandling.UserPlayer;
import takt.utilities.Utils;

public class User {
    private final String id;
    private final String displayName;
    private final UserPlayer player;
    private String sessionId;
    private Room room;

    public User(String displayName, UserPlayer player) {
        this.id = Utils.generateRandomString(12);
        this.displayName = displayName;
        this.player = player;
    }

    public UserPlayer getPlayer() {
        return player;
    }

    public String getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
