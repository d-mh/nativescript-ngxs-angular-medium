import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

const VALID_TOKEN = 'VALID TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(payload: { username: string, password: string }): Observable<{ token: string }> {
    if (payload.username === 'admin@example.com' && payload.password === 'pass') {
      return of({ token: VALID_TOKEN });
    }

    return throwError('Wrong login credentials!');
  }

  authenticate(token: string): Observable<{ token: string }> {
    if (this.isTokenValid(token)) {
      return of({ token: VALID_TOKEN });
    }

    return throwError('Wrong auth token!');
  }

  logout(token: string): Observable<any> {
    // do something with token

    return of(null);
  }

  // dummy implementation
  isTokenValid(token: string): Observable<boolean> {
    if (token === VALID_TOKEN) {
      return of(true);
    }

    return of(false);
  }

}
