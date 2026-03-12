export interface Exercise {
  id: string;
  categoryId: string;
  exerciseName: string;
  description?: string | null;
  series?: number | null;
  repetitions?: number | null;
  restTime?: number | null;
  isCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateExerciseInput = Omit<
  Exercise,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateExerciseInput = Partial<CreateExerciseInput>;
