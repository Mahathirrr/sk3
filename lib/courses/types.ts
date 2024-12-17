import { Database } from '@/lib/supabase/types';

export type Course = Database['public']['Tables']['courses']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type Enrollment = Database['public']['Tables']['enrollments']['Row'];

export type CourseWithInstructor = Course & {
  instructor: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
};

export type CourseDetails = CourseWithInstructor & {
  lessons: Lesson[];
  enrollment?: Enrollment;
};

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnailUrl?: string;
}