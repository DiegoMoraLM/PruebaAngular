import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { decodeToken, JwtPayload } from './jwt.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly isBrowser: boolean;
  private autenticado = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser && localStorage.getItem(this.tokenKey)) {
      this.autenticado.next(true);
    }
  }

  isAuthenticated(): boolean {
    return this.autenticado.value;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null;
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
      useCookie: true,
      deviceInfo: {
        userAgent: this.isBrowser ? navigator.userAgent : '',
        language: this.isBrowser ? navigator.language : '',
        deviceType: 'desktop',
      },
      ip: null,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.authSecret}`,
    });

    return this.http
      .post<any>(`${environment.apiUrl}/UserToken/Login`, body, { headers })
      .pipe(
        tap((res) => {
          if (this.isBrowser) {
            localStorage.setItem('access_token', res.accesToken);
            localStorage.setItem('user_id', res.userId.toString());
            localStorage.setItem('refresh_token', res.refreshToken); // opcional
          }
          this.autenticado.next(true);
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
    this.autenticado.next(false);
  }

  authStatus$(): Observable<boolean> {
    return this.autenticado.asObservable();
  }

  getUserDataFromToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    return decodeToken(token);
  }


}
