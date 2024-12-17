{`'use client';

import { useState } from 'react';
import { CourseDetails } from '@/lib/courses/types';
import { VideoPlayer } from './video-player';
import { LessonList } from './lesson-list';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

interface CourseContentProps {
  course: CourseDetails;
  isEnrolled: boolean;
  onEnroll: () => Promise<void>;
}

export function CourseContent({ course, isEnrolled, onEnroll }: CourseContentProps) {
  const [currentLessonId, setCurrentLessonId] = useState(course.lessons[0]?.id);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const { toast } = useToast();

  const currentLesson = course.lessons.find((lesson) => lesson.id === currentLessonId);

  const handleLessonComplete = () => {
    if (currentLessonId && !completedLessons.includes(currentLessonId)) {
      setCompletedLessons([...completedLessons, currentLessonId]);
      
      toast({
        title: 'Pelajaran selesai! 🎉',
        description: 'Lanjutkan ke pelajaran berikutnya.',
      });

      // Automatically move to next lesson
      const currentIndex = course.lessons.findIndex(
        (lesson) => lesson.id === currentLessonId
      );
      if (currentIndex < course.lessons.length - 1) {
        setCurrentLessonId(course.lessons[currentIndex + 1].id);
      }
    }
  };

  const handleLessonProgress = async (progress: number) => {
    // TODO: Save progress to database
    console.log('Progress:', progress);
  };

  return (
    <div className="container grid gap-8 py-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {isEnrolled ? (
          currentLesson && (
            <>
              <VideoPlayer
                videoUrl={currentLesson.video_url}
                onProgress={handleLessonProgress}
                onComplete={handleLessonComplete}
              />
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                <p className="mt-2 text-muted-foreground">
                  {currentLesson.description}
                </p>
              </div>
            </>
          )
        ) : (
          <div className="aspect-video flex items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
              <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Daftar untuk mengakses kursus ini
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dapatkan akses ke semua video dan materi pembelajaran
              </p>
              <Button onClick={onEnroll} className="mt-4">
                Daftar Sekarang
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        <LessonList
          lessons={course.lessons}
          currentLessonId={currentLessonId}
          completedLessons={completedLessons}
          onSelectLesson={setCurrentLessonId}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
}`}