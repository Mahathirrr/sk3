{`'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/components/ui/use-toast';
import { createDiscussion } from '@/lib/discussions/api';

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Judul minimal 5 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  content: z
    .string()
    .min(10, 'Konten minimal 10 karakter')
    .max(1000, 'Konten maksimal 1000 karakter'),
});

interface CreateDiscussionDialogProps {
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDiscussionCreated: () => void;
}

export function CreateDiscussionDialog({
  courseId,
  open,
  onOpenChange,
  onDiscussionCreated,
}: CreateDiscussionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await createDiscussion({
        courseId,
        title: values.title,
        content: values.content,
      });
      
      toast({
        title: 'Diskusi berhasil dibuat',
        description: 'Diskusi Anda telah berhasil dipublikasikan.',
      });
      
      form.reset();
      onOpenChange(false);
      onDiscussionCreated();
    } catch (error) {
      toast({
        title: 'Gagal membuat diskusi',
        description: 'Terjadi kesalahan saat membuat diskusi. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Diskusi Baru</DialogTitle>
          <DialogDescription>
            Ajukan pertanyaan atau mulai diskusi dengan siswa lain dan instruktur
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul diskusi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis pertanyaan atau topik diskusi Anda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Memuat...' : 'Publikasikan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}`}