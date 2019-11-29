import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayName: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, private readonly userService: UserService, private readonly authService: AuthenticationService,
    private readonly socketService: WebsocketService, private readonly errorService: ErrorService, private router: Router) {
    this.userService.getUserDisplayName().subscribe(msg => this.displayName = msg.response);
    this.socketService.connectToWebsocket();
  }

  ngOnInit() {
    this.form = this.fb.group({
      roomId: [, []]
    });
  }

  submit(): void {
    const roomId = this.roomId.substring(this.roomId.indexOf('/room'));
    try {
      this.router.navigateByUrl(roomId);
    } catch (exception) {
      this.errorService.logError(exception);
    }
  }

  createRoom(): void {
    let roomId = '';
    this.userService.createRoom().subscribe(msg => roomId = msg.response,
      (error) => this.errorService.logError(error),
      () => {
        try {
          this.router.navigate(['/room/' + roomId]);
        } catch (exception) {
          this.errorService.logError(exception);
        }
      });
  }

  logout(): void {
    this.socketService.disconnect();
    this.authService.logout();
  }

  get roomId(): string {
    return this.form.get('roomId').value;
  }

}
