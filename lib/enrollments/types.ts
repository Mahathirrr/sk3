export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface EnrollmentProgress {
  lessonId: string;
  progress: number;
  completedAt?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  lessonProgress?: EnrollmentProgress[];
}

export interface CreateEnrollmentData {
  courseId: string;
  userId: string;
  status?: EnrollmentStatus;
}