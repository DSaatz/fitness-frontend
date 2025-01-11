import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Journey } from "../../shared/interfaces/journey.interface";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class JourneyService {
    private readonly baseUrl = `${environment.apiUrl}/journey`;
  
    constructor(private http: HttpClient) {}
  
    getJourney(userId: string): Observable<Journey> {
      return this.http.get<Journey>(`${this.baseUrl}/${userId}`);
    }
  
    updateJourney(userId: string, journey: Partial<Journey>): Observable<Journey> {
      return this.http.put<Journey>(`${this.baseUrl}/${userId}`, journey);
    }
  
    createJourney(journey: Journey): Observable<Journey> {
      return this.http.post<Journey>(this.baseUrl, journey);
    }
  
    deleteJourney(userId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${userId}`);
    }
  }