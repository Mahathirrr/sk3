{`import { getCourseById } from '@/lib/courses/api';
import { CourseHeader } from '@/components/courses/course-header';
import { CourseContent } from '@/components/courses/course-content';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  let isEnrolled = false;

  if (session?.user) {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', course.id)
      .eq('user_id', session.user.id)
      .single();

    isEnrolled = !!enrollment;
  }

  return (
    <div>
      <CourseHeader course={course} />
      <CourseContent
        course={course}
        isEnrolled={isEnrolled}
        onEnroll={async () => {
          'use server';
          // TODO: Implement enrollment logic
        }}
      />
    </div>
  );
}`}