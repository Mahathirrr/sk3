'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CourseStats } from '@/lib/instructor/types';
import { Edit2, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface CourseTableProps {
  courses: CourseStats[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kursus</TableHead>
            <TableHead className="text-right">Siswa</TableHead>
            <TableHead className="text-right">Tingkat Penyelesaian</TableHead>
            <TableHead className="text-right">Pendapatan</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell className="text-right">{course.studentCount}</TableCell>
              <TableCell className="text-right">
                {Math.round(course.completionRate)}%
              </TableCell>
              <TableCell className="text-right">
                Rp {course.revenue.toLocaleString('id-ID')}
              </TableCell>
              <TableCell className="text-right">{course.rating.toFixed(1)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={\`/instructor/courses/\${course.id}/analytics\`}>
                    <Button variant="ghost" size="icon">
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={\`/instructor/courses/\${course.id}/edit\`}>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}