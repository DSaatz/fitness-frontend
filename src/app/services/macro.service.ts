import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
    return this.http.post<Macros>(`${this.apiUrl}/macros/calculate`, data);
  }
}
