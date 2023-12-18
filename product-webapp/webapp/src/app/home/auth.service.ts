import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() {
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = !!userId; 
  }

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
  }
}

