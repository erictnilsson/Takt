import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import { over, Client, Message } from 'stompjs';
import { ActiveUser } from 'src/app/models/activeUser';
import { Subject } from 'rxjs';
import { Track } from 'src/app/models/track';
import { PlaybackContext } from 'src/app/models/playbackContext';
import { ErrorService } from '../error/error.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { WebsocketMessage } from 'src/app/models/websocketMessage';
import { Device } from 'src/app/models/device';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly serverUrl: string;
  public readonly userSubject: Subject<WebsocketMessage>;
  public readonly searchResultSubject: Subject<Track[]>;
  public readonly trackQueueSubject: Subject<Track[]>;
  public readonly playbackSubject: Subject<WebsocketMessage>;

  private client: Client;
  private errorChannel: any;
  private privateChannel: any;
  private roomChannel: any;

  constructor(private errorService: ErrorService, private authService: AuthenticationService) {
    this.serverUrl = '/ws'; // 'http://localhost:8080/ws'
    this.userSubject = new Subject<WebsocketMessage>();
    this.searchResultSubject = new Subject<Track[]>();
    this.trackQueueSubject = new Subject<Track[]>();
    this.playbackSubject = new Subject<WebsocketMessage>();
  }

  public connectToWebsocket(): void {
    const tokenHeaders = {
      token: this.authService.getToken()
    };

    const socket: WebSocket = new SockJS(this.serverUrl, [], {
      sessionId: () => {
        return this.authService.getUserPayload().sub;
      }
    });
    this.client = over(socket);
    this.client.debug = null; // turn off debug messages
    this.client.connect(tokenHeaders, (frame) => {
      console.log('connected to the websocket');
    });
  }

  public connectToRoom(roomId: string): void {
    const tokenHeaders = {
      token: this.authService.getToken()
    };

    const socket: WebSocket = new SockJS(this.serverUrl, [], {
      sessionId: () => {
        return this.authService.getUserPayload().sub;
      }
    });
    this.client = over(socket);
    this.client.debug = null; // turn off debug messages
    this.client.connect(tokenHeaders, (frame) => {
      console.log('connected to the websocket');
      this.subscribeToRoom(roomId);
    });
  }

  public subscribeToRoom(roomId: string): void {
    if (this.isConnected()) {
      // Subscribe to errors
      this.errorChannel = this.client.subscribe('/user/queue/error', (message: Message) => {
        const error = JSON.parse(message.body).content;
        this.errorService.handleError(error);
      });
      // Subscribe to user-specific messages
      this.privateChannel = this.client.subscribe('/user/queue/private', (message: Message) => {
        this.handlePrivateMessage(JSON.parse(message.body));
      });
      // Subscribe to room-specific messages
      this.roomChannel = this.client.subscribe('/room/' + roomId, (message: Message) => {
        this.handleRoomMessage(JSON.parse(message.body));
      });
    } else {
      this.errorService.logError('Socket client is offline, unable to subscribe to room');
    }
  }

  public unsubscribeToRoom() {
    this.roomChannel.unsubscribe();
    this.privateChannel.unsubscribe();
    // don't unsubscribe to error channel?
  }

  public isConnected(): boolean {
    return this.client != null;
  }


  public disconnect(): void {
    if (this.client != null) {
      this.client.disconnect(() => {
        console.log('disconnected from websocket');
        this.client = null;
      });

    } else {
      this.errorService.logError('could not disconnect from socket since the socket-client is null');
    }
  }

  public searchTrack(query: string): void {
    this.client.send('/app/private/search', null, this.stringify(new WebsocketMessage('SEARCH', query)));
  }

  public pausPlayback(): void {
    this.client.send('/app/private/paus', null, this.stringify(new WebsocketMessage('PAUS', '')));
  }

  public startResumePlayback(): void {
    this.client.send('/app/private/play', null, this.stringify(new WebsocketMessage('PLAY', '')));
  }

  public queueTrack(roomId: string, track: Track): void {
    this.client.send('/app/room/' + roomId + '/queue_track', null, JSON.stringify(track));
  }

  public getPlayback(): void {
    this.client.send('/app/private/get_playback_context', null,
      this.stringify(new WebsocketMessage('CURRENTLY_PLAYING', '')));
  }

  public getDevices(): void {
    this.client.send('/app/private/get_available_devices', null,
      this.stringify(new WebsocketMessage('GET_DEVICES', '')));
  }

  public setDevice(device: Device): void {
    this.client.send('/app/private/set_device', null, JSON.stringify(device));
  }

  private stringify(wsMessage: WebsocketMessage): string {
    return JSON.stringify(wsMessage);
  }

  private handlePrivateMessage(wsMessage: WebsocketMessage): void {
    switch (wsMessage.messageType.toString()) {
      case 'TRACK_RESULT':
        const tracks: Track[] = wsMessage.content;
        this.searchResultSubject.next(tracks);
        break;

      case 'SEND_QUEUE':
        const queue: Track[] = wsMessage.content;
        this.trackQueueSubject.next(queue);
        break;

      case 'CURRENT_TRACK':
      case 'GET_DEVICES':
        this.playbackSubject.next(wsMessage);
        break;
    }
  }

  private handleRoomMessage(wsMessage: WebsocketMessage): void {
    switch (wsMessage.messageType.toString()) {
      case 'SUBSCRIBE':
      case 'UNSUBSCRIBE':
      case 'IS_ACTIVE':
        this.userSubject.next(wsMessage);
        break;

      case 'SEND_QUEUE':
        const queue: Track[] = wsMessage.content;
        this.trackQueueSubject.next(queue);
        break;

      case 'CURRENT_TRACK':
        this.playbackSubject.next(wsMessage);
        break;
    }
  }

}
