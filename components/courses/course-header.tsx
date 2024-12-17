{`import { CourseDetails } from '@/lib/courses/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Clock } from 'lucide-react';

interface CourseHeaderProps {
  course: CourseDetails;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const totalDuration = course.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="bg-muted/50">
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit" variant={
              course.difficulty === 'beginner' ? 'default' :
              course.difficulty === 'intermediate' ? 'secondary' :
              'destructive'
            }>
              {course.difficulty === 'beginner' ? 'Pemula' :
               course.difficulty === 'intermediate' ? 'Menengah' :
               'Lanjutan'}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              {course.description}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={course.instructor.avatar_url} />
                  <AvatarFallback>
                    {course.instructor.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {course.instructor.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">Instruktur</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {course.student_count} siswa terdaftar
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {hours > 0 ? \`\${hours} jam \` : ''}
                  {minutes} menit
                </span>
              </div>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={course.thumbnail_url || 'https://via.placeholder.com/640x360'}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}`}