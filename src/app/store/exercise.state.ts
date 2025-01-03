import { Exercise } from "../shared/interfaces/exercise.interface";

export interface ExerciseState{
    exercises: Exercise[];
    loading: boolean;
    error: string | null;
}