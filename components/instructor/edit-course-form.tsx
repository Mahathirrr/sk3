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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { updateCourse } from '@/lib/courses/api';
import { CourseDetails } from '@/lib/courses/types';
import { Upload, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Judul minimal 5 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  description: z
    .string()
    .min(20, 'Deskripsi minimal 20 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),
  category: z.string().min(1, 'Pilih kategori'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  isFree: z.boolean(),
  thumbnailUrl: z.string().url('URL thumbnail tidak valid').optional(),
});

interface EditCourseFormProps {
  course: CourseDetails;
}

export function EditCourseForm({ course }: EditCourseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      price: course.price,
      isFree: course.price === 0,
      thumbnailUrl: course.thumbnail_url || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await updateCourse(course.id, {
        ...values,
        price: values.isFree ? 0 : values.price,
      });
      
      toast({
        title: 'Kursus berhasil diperbarui',
        description: 'Perubahan telah disimpan.',
      });
    } catch (error) {
      toast({
        title: 'Gagal memperbarui kursus',
        description: 'Terjadi kesalahan saat memperbarui kursus. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Kursus</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul kursus" {...field} />
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
                  placeholder="Jelaskan tentang kursus Anda"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="programming">Pemrograman</SelectItem>
                    <SelectItem value="design">Desain</SelectItem>
                    <SelectItem value="business">Bisnis</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="personal">Pengembangan Diri</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tingkat Kesulitan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat kesulitan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Pemula</SelectItem>
                    <SelectItem value="intermediate">Menengah</SelectItem>
                    <SelectItem value="advanced">Lanjutan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isFree"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Kursus Gratis</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Buat kursus ini dapat diakses secara gratis
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga (Rp)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan harga kursus"
                  {...field}
                  disabled={form.watch('isFree')}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Thumbnail</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/thumbnail.jpg"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => {
                      // TODO: Implement image upload
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}