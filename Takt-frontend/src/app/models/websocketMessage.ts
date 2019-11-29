export class WebsocketMessage {
    messageType: string;
    content: any;

    constructor(messageType: string, content: any) {
        this.messageType = messageType;
        this.content = content;
    }
}
