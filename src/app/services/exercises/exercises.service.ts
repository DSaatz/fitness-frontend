import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../../shared/interfaces/exercise.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(term: string): Observable<Exercise[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Exercise[]>(`${this.apiUrl}/users/search`, { params });
  }
}