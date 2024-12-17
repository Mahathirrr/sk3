import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface RecentEnrollmentsProps {
  enrollments: {
    courseId: string;
    courseName: string;
    studentName: string;
    enrolledAt: string;
  }[];
}

export function RecentEnrollments({ enrollments }: RecentEnrollmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendaftaran Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {enrollments.map((enrollment, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {enrollment.studentName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{enrollment.studentName}</p>
                <p className="text-sm text-muted-foreground">
                  mendaftar di {enrollment.courseName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(enrollment.enrolledAt), 'dd MMMM yyyy', {
                    locale: id,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}