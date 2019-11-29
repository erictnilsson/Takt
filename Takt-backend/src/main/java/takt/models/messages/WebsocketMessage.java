package takt.models.messages;

import takt.models.enums.WebsocketMessageType;

public class WebsocketMessage {
    private WebsocketMessageType messageType;
    private Object content;

    public WebsocketMessage(WebsocketMessageType messageType, Object content) {
        this.messageType = messageType;
        this.content = content;
    }

    public WebsocketMessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(WebsocketMessageType messageType) {
        this.messageType = messageType;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
