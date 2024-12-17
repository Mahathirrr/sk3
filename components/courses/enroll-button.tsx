'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createEnrollment } from '@/lib/enrollments/api';
import { useAuth } from '@/lib/auth/hooks';
import { Lock } from 'lucide-react';

interface EnrollButtonProps {
  courseId: string;
  onEnrollmentComplete: () => void;
}

export function EnrollButton({ courseId, onEnrollmentComplete }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: 'Login diperlukan',
        description: 'Silakan login terlebih dahulu untuk mendaftar kursus.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      await createEnrollment({
        courseId,
        userId: user.id,
      });

      toast({
        title: 'Berhasil mendaftar',
        description: 'Anda telah berhasil mendaftar kursus ini.',
      });

      onEnrollmentComplete();
    } catch (error) {
      toast({
        title: 'Gagal mendaftar',
        description: 'Terjadi kesalahan saat mendaftar kursus. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnroll}
      disabled={isLoading}
      className="w-full gap-2"
    >
      <Lock className="h-4 w-4" />
      {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
    </Button>
  );
}