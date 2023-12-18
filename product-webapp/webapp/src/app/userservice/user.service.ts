import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9004';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}/profile`;
    return this.http.get(url);
  }

  updateUserProfile(userId: string, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    const headers = new HttpHeaders();
    // Add any required headers here
    return this.http.put(url, formData, { headers });
  }
}
