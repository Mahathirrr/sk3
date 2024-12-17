import { supabase } from '@/lib/supabase/client';
import { InstructorStats, CourseStats } from './types';

export async function getInstructorStats(
  instructorId: string
): Promise<InstructorStats> {
  // Get total students
  const { count: totalStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' })
    .eq('course.instructor_id', instructorId);

  // Get total courses
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .eq('instructor_id', instructorId);

  // Get total revenue
  const { data: payments } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'success')
    .eq('course.instructor_id', instructorId);

  const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  // Get recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(\`
      course_id,
      course:courses(title),
      user:users(full_name),
      created_at
    \`)
    .eq('course.instructor_id', instructorId)
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    totalStudents: totalStudents || 0,
    totalCourses: totalCourses || 0,
    totalRevenue,
    recentEnrollments: recentEnrollments?.map((enrollment) => ({
      courseId: enrollment.course_id,
      courseName: enrollment.course.title,
      studentName: enrollment.user.full_name,
      enrolledAt: enrollment.created_at,
    })) || [],
  };
}

export async function getCourseStats(
  instructorId: string
): Promise<CourseStats[]> {
  const { data: courses, error } = await supabase
    .from('courses')
    .select(\`
      id,
      title,
      student_count,
      enrollments (
        status,
        progress
      )
    \`)
    .eq('instructor_id', instructorId);

  if (error) throw error;

  return courses.map((course) => {
    const completedEnrollments = course.enrollments?.filter(
      (e) => e.status === 'completed'
    ).length;
    const totalEnrollments = course.enrollments?.length || 0;

    return {
      id: course.id,
      title: course.title,
      studentCount: course.student_count,
      completionRate: totalEnrollments
        ? (completedEnrollments / totalEnrollments) * 100
        : 0,
      revenue: 0, // TODO: Calculate from payments
      rating: 0, // TODO: Implement rating system
    };
  });
}