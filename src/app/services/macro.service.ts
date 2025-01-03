import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

interface calculateMacrosDto {
  calories: number;
  weight: number;
}

interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

@Injectable({
  providedIn: 'root'
})
export class MacroService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  calculateMacros(data: calculateMacrosDto) {
    console.log("sending this payload to the API", data);
    return this.http.post<any>(`${this.apiUrl}/macros/calculate`, data)
    .pipe(
      tap(response => { // Use tap to log the response
        console.log('API Response (Macro Service):', response);
      }),
      catchError(error => {
        console.error('Error calculating macros:', error);
        return throwError(() => error);
      })
    );
  }
}