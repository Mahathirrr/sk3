{`import { Lesson } from '@/lib/courses/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonListProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  isEnrolled: boolean;
}

export function LessonList({
  lessons,
  currentLessonId,
  completedLessons,
  onSelectLesson,
  isEnrolled,
}: LessonListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-16rem)] rounded-lg border bg-card">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Daftar Pelajaran</h2>
        <div className="space-y-2">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <Button
                key={lesson.id}
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2',
                  isCurrent && 'bg-accent',
                  !isEnrolled && 'cursor-not-allowed opacity-60'
                )}
                onClick={() => isEnrolled && onSelectLesson(lesson.id)}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : isCurrent ? (
                  <PlayCircle className="h-4 w-4 text-primary" />
                ) : !isEnrolled ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <div className="h-4 w-4 rounded-full border" />
                )}
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-medium">{lesson.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(lesson.duration / 60)} menit
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}`}