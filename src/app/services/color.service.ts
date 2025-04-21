import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DisplayColor {
  color: string;
  ptwUser: any;
  ptlUser: {
    id: number;
    username: string;
  } | null;
}

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private http: HttpClient) {}

  getColores(): Observable<DisplayColor[]> {
    return this.http.get<DisplayColor[]>(
      `${environment.apiUrl}/DisplayColor/GetAll`
    );
  }

  assignColor(userId: number, color: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/DisplayColor/SetUserPTL?userId=${userId}&color=${color}`,
      {},
      { responseType: 'text' }
    );
  }

  resetUserColors(userId: number): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/DisplayColor/ResetAllUserColor?userId=${userId}`,
      {},
      { responseType: 'text' }
    );
  }
}
