export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  recentEnrollments: {
    courseId: string;
    courseName: string;
    studentName: string;
    enrolledAt: string;
  }[];
}

export interface CourseStats {
  id: string;
  title: string;
  studentCount: number;
  completionRate: number;
  revenue: number;
  rating: number;
}