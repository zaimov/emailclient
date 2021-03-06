import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupConfirmation {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';


  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.baseUrl}/auth/username`, {
      username
    });
  }

  signup(credentials: SignupConfirmation) {
    return this.http.post<SignupResponse>(
      `${this.baseUrl}/auth/signup`, credentials).pipe(
      tap((response) => {
        this.signedin$.next(true);
        this.username = response.username;
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.baseUrl}/auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }

  signein(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${this.baseUrl}/auth/signin`, credentials).pipe(
      tap((response) => {
        this.signedin$.next(true);
        this.username = response.username;
      })
    );
  }

  signeout() {
    return this.http.post(`${this.baseUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }
}
