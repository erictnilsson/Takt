import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() roomId: string;
  @Input() displayName: string;
  constructor(private readonly socketService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  copyToClipboard(): void {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', ('https://takt-application.herokuapp.com' + this.router.url));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.socketService.unsubscribeToRoom();
  }
}
