import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { RestResponse } from 'src/app/models/responses/restResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userUrl: string;
  constructor(private errorService: ErrorService, private http: HttpClient) {
    this.userUrl = '/api/user';
  }

  public getUserDisplayName(): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.userUrl);
  }

  public createRoom(): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.userUrl + '/create_room');
  }

  public joinRoom(roomId: string): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.userUrl + '/join_room?id=' + roomId);
  }
}
