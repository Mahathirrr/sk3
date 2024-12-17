import { supabase } from '@/lib/supabase/client';
import { CreateEnrollmentData, Enrollment, EnrollmentProgress } from './types';

export async function createEnrollment(data: CreateEnrollmentData): Promise<Enrollment> {
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .insert({
      course_id: data.courseId,
      user_id: data.userId,
      status: data.status || 'active',
      progress: 0,
    })
    .select('*')
    .single();

  if (error) throw error;
  return enrollment;
}

export async function updateLessonProgress(
  enrollmentId: string,
  lessonId: string,
  progress: number
): Promise<void> {
  const { error } = await supabase.from('lesson_progress').upsert({
    enrollment_id: enrollmentId,
    lesson_id: lessonId,
    progress,
    completed_at: progress >= 100 ? new Date().toISOString() : null,
  });

  if (error) throw error;
}

export async function getEnrollmentProgress(
  enrollmentId: string
): Promise<EnrollmentProgress[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('enrollment_id', enrollmentId);

  if (error) throw error;
  return data;
}