export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in seconds
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonData {
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
}