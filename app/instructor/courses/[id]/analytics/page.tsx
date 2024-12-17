import { getCourseById } from '@/lib/courses/api';
import { getCourseAnalytics } from '@/lib/analytics/api';
import { AnalyticsDashboard } from '@/components/instructor/analytics-dashboard';
import { StudentList } from '@/components/instructor/student-list';
import { notFound } from 'next/navigation';

interface CourseAnalyticsPageProps {
  params: {
    id: string;
  };
}

export default async function CourseAnalyticsPage({ params }: CourseAnalyticsPageProps) {
  const course = await getCourseById(params.id);
  
  if (!course) {
    notFound();
  }

  const analytics = await getCourseAnalytics(params.id);

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Analisis Kursus</h1>
      
      <div className="mb-8">
        <AnalyticsDashboard analytics={analytics} />
      </div>

      <div>
        <StudentList courseId={course.id} />
      </div>
    </div>
  );
}