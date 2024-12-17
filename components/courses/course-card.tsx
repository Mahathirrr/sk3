{`import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CourseWithInstructor } from '@/lib/courses/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: CourseWithInstructor;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={\`/courses/\${course.id}\`}>
      <Card className="h-full overflow-hidden transition-all hover:border-primary">
        <CardHeader className="p-0">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={course.thumbnail_url || 'https://via.placeholder.com/640x360'}
              alt={course.title}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Badge className="w-fit" variant={
            course.difficulty === 'beginner' ? 'default' :
            course.difficulty === 'intermediate' ? 'secondary' :
            'destructive'
          }>
            {course.difficulty === 'beginner' ? 'Pemula' :
             course.difficulty === 'intermediate' ? 'Menengah' :
             'Lanjutan'}
          </Badge>
          <h3 className="line-clamp-2 text-lg font-semibold">{course.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 p-4 pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={course.instructor.avatar_url} />
              <AvatarFallback>
                {course.instructor.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{course.instructor.full_name}</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {course.student_count}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}`}