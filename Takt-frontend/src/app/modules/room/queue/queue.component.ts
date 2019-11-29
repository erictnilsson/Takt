import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  tracks: Track[];
  constructor(private readonly socketService: WebsocketService, private readonly errorService: ErrorService) {
    this.tracks = [];

    this.socketService.trackQueueSubject.subscribe(queue => {
      this.tracks = queue;
    }, error => this.errorService.handleError(error));
  }

  ngOnInit() {
  }

  get results(): string[] {
    // Only show the two first artists for a given track
    return this.tracks.map(track => track.name + ' - ' + track.artists.slice(0, 2).map(artist => ' ' + artist));
  }
}
