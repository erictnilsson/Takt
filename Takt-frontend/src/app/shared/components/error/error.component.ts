import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: string;
  constructor(private errorService: ErrorService) {
    this.errorService.getErrorSubject().subscribe(error => {
      this.error = error;
    });
  }

  ngOnInit() {
  }

  removeError(): void {
    this.error = null;
  }

  get showError(): boolean {
    return this.error != null;
  }
}
