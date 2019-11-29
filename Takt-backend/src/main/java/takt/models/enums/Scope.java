package takt.models.enums;

public enum Scope {
    USER_FOLLOW_READ("user-follow-read"),
    USER_FOLLOW_MODIFY("user-follow-modify"),
    USER_READ_RECENTLY_PLAYED("user-read-recently-played"),
    USER_TOP_READ("user-top-read"),
    USER_LIBRARY_READ("user-library-read"),
    USER_LIBRARY_MODIFY("user-library-modify"),
    USER_READ_PLAYBACK_STATE("user-read-playback-state"),
    USER_READ_CURRENTLY_PLAYING("user-read-currently-playing"),
    USER_MODIFY_PLAYBACK_STATE("user-modify-playback-state"),
    PLAYLIST_READ_COLLABORATIVE("playlist-read-collaborative"),
    PLAYLIST_MODIFY_PRIVATE("playlist-modify-private"),
    PLAYLIST_MODIFY_PUBLIC("playlist-modify-public"),
    PLAYLIST_READ_PRIVATE("playlist-read-private"),
    STREAMING("streaming"),
    APP_REMOTE_CONTROL("app-remote-control"),
    USER_READ_EMAIL("user-read-email"),
    USER_READ_PRIVATE("user-read-private");

    private String value;

    Scope(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
