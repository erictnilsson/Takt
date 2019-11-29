import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: Track[];
  form: FormGroup;

  @Input() roomId: string;
  constructor(private readonly socketService: WebsocketService, private readonly errorService: ErrorService, private fb: FormBuilder) {
    this.searchResults = [];

    // Subscribe to the search-results
    this.socketService.searchResultSubject.subscribe(tracks => {
      tracks.forEach(track => this.searchResults.push(track));
    },
      error => this.errorService.handleError(error));
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchInput: [, Validators.required]
    });
  }

  submit(): void {
    this.search();
  }

  queueTrack(i: number): void {
    const track = this.searchResults[i];
    this.socketService.queueTrack(this.roomId, track);
  }

  private search(): void {
    this.searchResults = [];
    this.socketService.searchTrack(this.searchInput);
  }

  get searchInput(): string {
    return this.form.get('searchInput').value;
  }

  get results(): string[] {
    // Only show the two first artists for a given track
    return this.searchResults.map(track => track.name + ' – ' + track.artists.slice(0, 2).map(r => ' ' + r));
  }

}
