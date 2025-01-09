// shared/mocks/mock-exercise.data.ts
import { Exercise } from '../interfaces/exercise.interface';

export const mockExercises: Exercise[] = [
    {
        name: 'Push-Ups',
        description: 'A classic bodyweight exercise for chest and triceps.',
        muscleGroup: 'Chest'
    },
    {
      name: 'Squats',
      description: 'A fundamental lower body exercise.',
      muscleGroup: 'Legs'
    },
    {
      name: 'Bicep Curls',
      description: 'An isolation exercise for the biceps.',
      muscleGroup: 'Arms'
    },
    {
      name: 'Plank',
      description: 'An isometric core strengthening exercise.',
      muscleGroup: 'Core'
    }
];