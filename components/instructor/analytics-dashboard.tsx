'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseAnalytics } from '@/lib/analytics/types';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Users, BookOpen, Clock, Award } from 'lucide-react';

interface AnalyticsDashboardProps {
  analytics: CourseAnalytics;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const completionData = analytics.completionRateByWeek.map((data) => ({
    name: \`Minggu \${data.week}\`,
    rate: data.rate,
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.newStudentsThisWeek} minggu ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pelajaran Selesai</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              dari {analytics.totalLessons} pelajaran
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waktu Belajar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.totalWatchTime / 3600)} jam
            </div>
            <p className="text-xs text-muted-foreground">
              rata-rata {Math.round(analytics.averageWatchTime / 60)} menit/siswa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Penyelesaian</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.completionRate)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.completedStudents} siswa lulus
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tingkat Penyelesaian Mingguan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => \`\${value}%\`}
                />
                <Tooltip />
                <Bar
                  dataKey="rate"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}