import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): boolean {
    // Replace with actual authentication logic
    if ((username === 'Admin' && password === 'Admin')) {
      sessionStorage.setItem('isLogin', 'Valid');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('isLogin');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLogin') === 'Valid';
  }

  private isValidUser(username: string): boolean {
    // Add your logic to validate the username against teamDetails and employeDetails
    return true; // Replace with actual validation logic
  }
}
