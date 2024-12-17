import { supabase } from '@/lib/supabase/client';
import { Lesson, CreateLessonData } from './types';

export async function createLesson(data: CreateLessonData): Promise<Lesson> {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .insert({
      course_id: data.courseId,
      title: data.title,
      description: data.description,
      video_url: data.videoUrl,
      duration: data.duration * 60, // Convert minutes to seconds
      order: data.order,
    })
    .select()
    .single();

  if (error) throw error;
  return lesson;
}

export async function updateLesson(
  id: string,
  data: Partial<CreateLessonData>
): Promise<Lesson> {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .update({
      title: data.title,
      description: data.description,
      video_url: data.videoUrl,
      duration: data.duration ? data.duration * 60 : undefined,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return lesson;
}

export async function deleteLesson(id: string): Promise<void> {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);

  if (error) throw error;
}