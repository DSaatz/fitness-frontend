import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ExerciseRecord } from "../../shared/interfaces/exercise-record.interface";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrackingService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    //Basic CRUD operations for exercise records
    getAllExerciseRecords(): Observable<ExerciseRecord[]> {
        return this.http.get<ExerciseRecord[]>(`${this.apiUrl}/exercise-record`);
    }

    getExerciseRecord(id: string): Observable<ExerciseRecord> {
        return this.http.get<ExerciseRecord>(`${this.apiUrl}/exercise-record/${id}`);
    }

    createExerciseRecord(exerciseRecord: ExerciseRecord): Observable<ExerciseRecord> {
        return this.http.post<ExerciseRecord>(`${this.apiUrl}/exercise-record`, exerciseRecord);
    }

    updateExerciseRecord(id: string, exerciseRecord: ExerciseRecord): Observable<ExerciseRecord> {
        return this.http.put<ExerciseRecord>(`${this.apiUrl}/exercise-record/${id}`, exerciseRecord);
    }

    deleteExerciseRecord(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/exercise-record/${id}`);
    }

    getAllExerciseRecordsForUser(userId: string): Observable<ExerciseRecord[]> {
        return this.http.get<ExerciseRecord[]>(`${this.apiUrl}/exercise-record/user/${userId}`);
    }

    //To get the users exercises use the loadWorkouts from workout-editor.service.ts
    //Then List the Plans and their respective Exercises with the record values and give the possibility to update them
}