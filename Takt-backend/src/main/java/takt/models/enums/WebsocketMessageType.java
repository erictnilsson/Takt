package takt.models.enums;


public enum WebsocketMessageType {
    SUBSCRIBE("SUBSCRIBE"),
    UNSUBSCRIBE("UNSUBSCRIBE"),
    START_RESUME("START_RESUME"),
    SEND_QUEUE("SEND_QUEUE"),
    TRACK_RESULT("TRACK_RESULT"),
    CURRENTLY_PLAYING("CURRENTLY_PLAYING"),
    CURRENT_TRACK("CURRENT_TRACK"),
    IS_ACTIVE("IS_ACTIVE"),
    SEARCH("SEARCH"),
    PLAY("PLAY"),
    PAUS("PAUS"),
    GET_PLAYER_CONTEXT("GET_PLAYER_CONTEXT"),
    ERROR("ERROR"),
    SET_DEVICE("SET_DEVICE"),
    GET_DEVICES("GET_DEVICES");

    private String value;

    WebsocketMessageType(String value) {
        this.value = value;
    }

    public String getValue() {
        return null;
    }
}
