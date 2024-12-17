import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InstructorStats } from '@/lib/instructor/types';
import { Users, BookOpen, DollarSign } from 'lucide-react';

interface DashboardStatsProps {
  stats: InstructorStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            siswa terdaftar
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCourses}</div>
          <p className="text-xs text-muted-foreground">
            kursus aktif
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Rp {stats.totalRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-xs text-muted-foreground">
            pendapatan keseluruhan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}