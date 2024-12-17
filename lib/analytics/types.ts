export interface CourseAnalytics {
  totalStudents: number;
  newStudentsThisWeek: number;
  totalLessons: number;
  completedLessons: number;
  totalWatchTime: number; // in seconds
  averageWatchTime: number; // in seconds
  completionRate: number; // percentage
  completedStudents: number;
  completionRateByWeek: {
    week: number;
    rate: number;
  }[];
}

export interface StudentProgress {
  id: string;
  name: string;
  avatarUrl: string | null;
  progress: number;
  lastActive: string;
}