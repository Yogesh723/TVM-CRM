import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private timeout: any;
  private timeoutDuration = 10 * 60 * 1000;  // 30 minutes
  // 5 * 1000; // 5 sec
  constructor(private router: Router, private ngZone: NgZone) {}

  startTimeout() {
    this.resetTimeout();

    window.addEventListener('mousemove', this.resetTimeout.bind(this));
    window.addEventListener('keypress', this.resetTimeout.bind(this));
  }

  resetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
        sessionStorage.removeItem('isLogin');
        alert('Session expired. Please log in again.');
      });
    }, this.timeoutDuration);
  }
}
