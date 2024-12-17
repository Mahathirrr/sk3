'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function DashboardHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Instruktur</h1>
        <p className="mt-2 text-muted-foreground">
          Kelola kursus dan pantau perkembangan siswa Anda
        </p>
      </div>
      <Link href="/instructor/courses/create">
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Buat Kursus Baru
        </Button>
      </Link>
    </div>
  );
}