import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { Device } from 'src/app/models/device';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { PlaybackContext } from 'src/app/models/playbackContext';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private interval;
  currentTrack: Track;
  availDevices: Device[];
  positionMs: number;
  endPositionMs: number;
  playing: boolean;

  @Input() roomId: string;
  constructor(private readonly socketService: WebsocketService, private readonly errorService: ErrorService) {
    this.positionMs = 0;
    this.endPositionMs = 0;
    this.availDevices = [];
    this.listenForFocus();
  }

  ngOnInit() {
    // Subscribe to the room's playback
    this.socketService.playbackSubject.subscribe(message => {
      if (message.messageType === 'CURRENT_TRACK') {
        const playback: PlaybackContext = message.content;
        this.currentTrack = playback.track;
        this.positionMs = playback.positionMs;
        this.endPositionMs = 0;

        this.stopPlayerSlider();
        if (this.currentTrack) {
          this.endPositionMs = this.currentTrack.durationMs;
          this.startPlayerSlider();
        }
      } else if (message.messageType === 'GET_DEVICES') {
        const devices: Device[] = JSON.parse(JSON.stringify(message.content));
        this.availDevices = devices;
      }

    },
      error => this.errorService.handleError(error.message));
  }

  playPaus() {
    if (this.playing && this.currentTrack) {
      this.playing = false;
      this.socketService.pausPlayback();
    } else if (this.currentTrack) {
      this.playing = true;
      this.socketService.startResumePlayback();
    } else {
      this.errorService.handleError('No playback available');
    }
    this.toggleActiveSlider();
  }

  setDevice(i: any): void {
    const device: Device = this.availDevices.find(d => d.name === i);
    this.socketService.setDevice(device);
  }

  private startPlayerSlider(): void {
    this.interval = setInterval(() => {
      if (this.positionMs < this.endPositionMs) {
        this.positionMs += 10;
      }
    }, 10);
  }

  private stopPlayerSlider(): void {
    clearInterval(this.interval);
  }

  private toggleActiveSlider(): void {
    document.getElementById('player-slider').classList.toggle('active-slider', this.playing);
  }

  // When window is refocused: stop the slider, get the current playback-time, and re-start it
  private listenForFocus(): void {
    window.addEventListener('focus', event => {
      if (this.currentTrack) {
        this.stopPlayerSlider();
        this.socketService.getPlayback();
        this.startPlayerSlider();
      }
    });
  }

  get currentPosition(): Date {
    return new Date(this.positionMs);
  }

  get endPosition(): Date {
    return new Date(this.endPositionMs);
  }

  get current(): string {
    if (this.currentTrack) {
      return (this.currentTrack.name + ' – ' + this.currentTrack.artists.slice(0, 2).map(a => ' ' + a));
    } else {
      return '';
    }
  }

  get devices(): string[] {
    return this.availDevices.map(device => device.name);
  }

}
