import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { CourseWithInstructor, CourseDetails, CreateCourseData } from './types';

export async function getCourses(): Promise<CourseWithInstructor[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('courses')
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      )
    \`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CourseWithInstructor[];
}

export async function getCourseById(id: string): Promise<CourseDetails | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('courses')
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      ),
      lessons (*)
    \`)
    .eq('id', id)
    .single();

  if (error) return null;
  return data as CourseDetails;
}

export async function createCourse(data: CreateCourseData): Promise<CourseWithInstructor> {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data: course, error } = await supabase
    .from('courses')
    .insert({
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      price: data.price,
      thumbnail_url: data.thumbnailUrl,
      instructor_id: user.user.id,
    })
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      )
    \`)
    .single();

  if (error) throw error;
  return course;
}

export async function updateCourse(
  id: string,
  data: Partial<CreateCourseData>
): Promise<CourseWithInstructor> {
  const { data: course, error } = await supabase
    .from('courses')
    .update(data)
    .eq('id', id)
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      )
    \`)
    .single();

  if (error) throw error;
  return course;
}

export async function deleteCourse(id: string): Promise<void> {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}