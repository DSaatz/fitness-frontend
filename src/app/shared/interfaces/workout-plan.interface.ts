export interface WorkoutPlan {
    _id: string;
    name: string;
    description: string;
    exercises: { 
        _id: string;
        name: string;
        description: string;
        muscleGroup: string;
    }[];
}
