import { supabase } from '@/lib/supabase/client';
import { CourseAnalytics, StudentProgress } from './types';

export async function getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
  // Get total students
  const { count: totalStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' })
    .eq('course_id', courseId);

  // Get new students this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const { count: newStudentsThisWeek } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' })
    .eq('course_id', courseId)
    .gte('created_at', oneWeekAgo.toISOString());

  // Get lesson completion data
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id')
    .eq('course_id', courseId);

  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('enrollment.course_id', courseId)
    .eq('completed', true);

  // Get watch time data
  const { data: watchTimeData } = await supabase
    .from('lesson_progress')
    .select('watch_time')
    .eq('enrollment.course_id', courseId);

  const totalWatchTime = watchTimeData?.reduce(
    (sum, { watch_time }) => sum + (watch_time || 0),
    0
  ) || 0;

  // Calculate completion rate by week
  const { data: weeklyCompletions } = await supabase
    .from('enrollments')
    .select('created_at, progress')
    .eq('course_id', courseId);

  const completionRateByWeek = Array.from({ length: 12 }, (_, i) => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weekEnrollments = weeklyCompletions?.filter(
      (e) => new Date(e.created_at) >= weekStart && new Date(e.created_at) < weekEnd
    );

    const completedCount = weekEnrollments?.filter((e) => e.progress === 100).length || 0;
    const totalCount = weekEnrollments?.length || 0;

    return {
      week: 12 - i,
      rate: totalCount ? (completedCount / totalCount) * 100 : 0,
    };
  }).reverse();

  return {
    totalStudents: totalStudents || 0,
    newStudentsThisWeek: newStudentsThisWeek || 0,
    totalLessons: lessons?.length || 0,
    completedLessons: lessonProgress?.length || 0,
    totalWatchTime,
    averageWatchTime: totalStudents ? totalWatchTime / totalStudents : 0,
    completionRate:
      totalStudents && lessons?.length
        ? (lessonProgress?.length || 0) / (totalStudents * lessons.length) * 100
        : 0,
    completedStudents: weeklyCompletions?.filter((e) => e.progress === 100).length || 0,
    completionRateByWeek,
  };
}

export async function getStudentProgress(courseId: string): Promise<StudentProgress[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(\`
      id,
      user:users (
        id,
        full_name,
        avatar_url
      ),
      progress,
      last_active_at
    \`)
    .eq('course_id', courseId);

  if (error) throw error;

  return data.map((enrollment) => ({
    id: enrollment.id,
    name: enrollment.user.full_name,
    avatarUrl: enrollment.user.avatar_url,
    progress: enrollment.progress,
    lastActive: enrollment.last_active_at,
  }));
}