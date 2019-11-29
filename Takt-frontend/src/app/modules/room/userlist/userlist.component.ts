import { Component, OnInit } from '@angular/core';
import { ActiveUser } from 'src/app/models/activeUser';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: ActiveUser[];

  constructor(private readonly socketService: WebsocketService, private readonly errorService: ErrorService) {
    this.users = [];

    // Subscribe
    this.socketService.userSubject.subscribe(msg => {
      switch (msg.messageType.toString()) {
        case 'SUBSCRIBE':
          const users: ActiveUser[] = JSON.parse(JSON.stringify(msg.content));
          this.users = users;
          break;
        case 'UNSUBSCRIBE':
          const user: ActiveUser = JSON.parse(JSON.stringify(msg.content));
          const i = this.users.findIndex(iUser => iUser.displayName === user.displayName);
          this.users.splice(i);
          break;
        case 'IS_ACTIVE':
          const foo: ActiveUser = JSON.parse(JSON.stringify(msg.content));
          const bar = this.users.findIndex(iUser => iUser.displayName === foo.displayName);
          this.users.splice(bar, 1, foo);
          break;
      }
    }, error => this.errorService.handleError(error));
  }

  ngOnInit() {
  }

}
