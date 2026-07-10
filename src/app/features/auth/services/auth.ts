import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../../core/models/types';
interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // ---- Reactive state with signals ----
  private _currentUser = signal<User | null>(this.getUserFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  /**
   * Authenticate user, store JWT and user data, then navigate to dashboard.
   */
  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    const demoUser: User = {
      id: 1,
      username: credentials.username,
      name: credentials.username,
      role: 'admin'
    };

    const response: AuthResponse = {
      token: 'demo-token',
      user: demoUser
    };

    return of(response).pipe(
      tap(() => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this._currentUser.set(response.user);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  /**
   * Clear session and redirect to login.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Retrieve the raw JWT string.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Load user from localStorage on app startup.
   */
  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (!user) return null;

    try {
      return JSON.parse(user) as User;
    } catch {
      this.logout();   // corrupted data – force clean slate
      return null;
    }
  }
}