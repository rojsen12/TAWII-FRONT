import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3100/user';  // Ustaw URL swojego backendu

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { email: username, password }; // Backend oczekuje email, nie username
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const registerData = { name: username, email, password };  // Backend oczekuje 'name', nie 'username'
    return this.http.post<any>(`${this.apiUrl}/create`, registerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
