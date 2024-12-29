import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  testConnection() {
    return this.http.get(`${this.apiUrl}/apiStatus`);
  }
}