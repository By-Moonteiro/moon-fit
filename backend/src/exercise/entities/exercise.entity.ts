export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  muscleGroup: string;
  executionMediaUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateExerciseInput = Omit<
  Exercise,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateExerciseInput = Partial<CreateExerciseInput>;
