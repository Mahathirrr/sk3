import { CreateCourseForm } from '@/components/instructor/create-course-form';

export default function CreateCoursePage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Buat Kursus Baru</h1>
        <CreateCourseForm />
      </div>
    </div>
  );
}