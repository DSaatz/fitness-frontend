import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Exercise } from '../../shared/interfaces/exercise.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(term: string): Observable<Exercise[]> {
    const url = `${this.apiUrl}/exercises/search?term=${term}`;
    console.log('Searching exercises with term:', term, 'URL:', url);
    return this.http.get<Exercise[]>(url).pipe(
      tap((exercises) => {
        console.log('Fetched exercises from backend:', exercises);
      }),
      catchError((error) => {
        console.error('Error fetching exercises:', error);
        return of([]); // Fallback to an empty array if error occurs
      })
    );
  }
  
  
}