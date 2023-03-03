import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private readonly API = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  saveUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.API}/new/user`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.httpClient.put(`${this.API}/update/user`, user);
  }

  deleteUser(userId: any): Observable<any> {
    return this.httpClient.delete(`${this.API}/delete/user?id=${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.API}/get/all-users`);
  }

  login(userLogin: any): Observable<any> {
    return this.httpClient.post(`${this.API}/login`, userLogin);
  }
}
