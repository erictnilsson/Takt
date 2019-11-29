import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject: Subject<string>;
  constructor() {
    this.errorSubject = new Subject<string>();
  }

  public handleError(error: any): void {
    this.errorSubject.next(error.toString());
  }

  public getErrorSubject(): Subject<string> {
    return this.errorSubject;
  }

  public logError(error: any): void {
    console.error(error);
  }
}
