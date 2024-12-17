'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Lesson } from '@/lib/courses/types';
import { createLesson, updateLesson, deleteLesson } from '@/lib/lessons/api';
import { Plus, Pencil, Trash2, GripVertical, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  description: z
    .string()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  videoUrl: z.string().url('URL video tidak valid'),
  duration: z.number().min(1, 'Durasi minimal 1 menit'),
});

interface LessonManagerProps {
  courseId: string;
  lessons: Lesson[];
}

export function LessonManager({ courseId, lessons: initialLessons }: LessonManagerProps) {
  const [lessons, setLessons] = useState(initialLessons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
      duration: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (editingLesson) {
        const updatedLesson = await updateLesson(editingLesson.id, values);
        setLessons(lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l)));
        toast({
          title: 'Pelajaran berhasil diperbarui',
          description: 'Perubahan telah disimpan.',
        });
      } else {
        const newLesson = await createLesson({
          ...values,
          courseId,
          order: lessons.length,
        });
        setLessons([...lessons, newLesson]);
        toast({
          title: 'Pelajaran berhasil ditambahkan',
          description: 'Pelajaran baru telah ditambahkan ke kursus.',
        });
      }
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: 'Gagal menyimpan pelajaran',
        description: 'Terjadi kesalahan saat menyimpan pelajaran. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    form.reset({
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.video_url,
      duration: lesson.duration / 60, // Convert seconds to minutes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (lessonId: string) => {
    try {
      await deleteLesson(lessonId);
      setLessons(lessons.filter((l) => l.id !== lessonId));
      toast({
        title: 'Pelajaran berhasil dihapus',
        description: 'Pelajaran telah dihapus dari kursus.',
      });
    } catch (error) {
      toast({
        title: 'Gagal menghapus pelajaran',
        description: 'Terjadi kesalahan saat menghapus pelajaran. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Materi Pembelajaran</h2>
        <Button
          onClick={() => {
            setEditingLesson(null);
            form.reset();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pelajaran
        </Button>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="flex items-center gap-4 rounded-lg border bg-card p-4"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground">
                {Math.floor(lesson.duration / 60)} menit
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(lesson)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(lesson.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? 'Edit Pelajaran' : 'Tambah Pelajaran Baru'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Pelajaran</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul pelajaran" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Jelaskan tentang pelajaran ini"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Video</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtube.com/watch?v=..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi (menit)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan durasi video"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingLesson ? 'Simpan Perubahan' : 'Tambah Pelajaran'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}