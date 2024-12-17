{`import { getCourses } from '@/lib/courses/api';
import { CourseCard } from '@/components/courses/course-card';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kursus Tersedia</h1>
        <p className="mt-2 text-muted-foreground">
          Pilih dari berbagai kursus berkualitas dari instruktur terbaik
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}`}