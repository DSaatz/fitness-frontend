export interface ProgressData {
    date: string;
    bf?: number;
    weight?: number;
  }
  
  export interface Journey {
    userId: string;
    bfProgress: ProgressData[];
    weightProgress: ProgressData[];
  }
  