import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<string | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.loggedIn.next(!!token);
      const storedUserId = localStorage.getItem('userId');
      this.userId.next(storedUserId);
    }
  }

  setLoggedIn(state: boolean, userId?: string): void {
    this.loggedIn.next(state);
    if (isPlatformBrowser(this.platformId)) {
      if (state && userId) {
        localStorage.setItem('userId', userId);
        this.userId.next(userId);
      } else {
        localStorage.removeItem('userId');
        this.userId.next(null);
      }
    }
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserId(): Observable<string | null> {
    return this.userId.asObservable();
  }
}
