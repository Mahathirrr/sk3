import { getCourseById } from '@/lib/courses/api';
import { EditCourseForm } from '@/components/instructor/edit-course-form';
import { LessonManager } from '@/components/instructor/lesson-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { notFound } from 'next/navigation';

interface EditCoursePageProps {
  params: {
    id: string;
  };
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Kursus</h1>
      
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Detail Kursus</TabsTrigger>
          <TabsTrigger value="lessons">Materi Pembelajaran</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <EditCourseForm course={course} />
        </TabsContent>

        <TabsContent value="lessons">
          <LessonManager courseId={course.id} lessons={course.lessons} />
        </TabsContent>
      </Tabs>
    </div>
  );
}