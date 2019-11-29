import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Track } from 'src/app/models/track';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  readonly roomId: string;
  displayName: string;

  constructor(private readonly socketService: WebsocketService, private readonly userService: UserService, private route: ActivatedRoute) {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserDisplayName().subscribe(msg => this.displayName = msg.response);

    if (!this.socketService.isConnected()) {
      this.socketService.connectToRoom(this.roomId);
    } else {
      setTimeout(() => {
        this.socketService.subscribeToRoom(this.roomId);
      }, 600);
    }
  }

  ngOnInit() {
  }
}
