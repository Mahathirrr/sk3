'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/courses/progress-bar';
import { getStudentProgress } from '@/lib/analytics/api';
import { StudentProgress } from '@/lib/analytics/types';
import { Search, ArrowUpDown } from 'lucide-react';

interface StudentListProps {
  courseId: string;
}

export function StudentList({ courseId }: StudentListProps) {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'lastActive'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const loadStudents = async () => {
      const data = await getStudentProgress(courseId);
      setStudents(data);
    };
    loadStudents();
  }, [courseId]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === 'progress') {
      return sortOrder === 'asc'
        ? a.progress - b.progress
        : b.progress - a.progress;
    }
    // lastActive
    return sortOrder === 'asc'
      ? new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
      : new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
  });

  const toggleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Siswa</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-2"
                >
                  Nama Siswa
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('progress')}
                  className="flex items-center gap-2"
                >
                  Progress
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('lastActive')}
                  className="flex items-center gap-2"
                >
                  Terakhir Aktif
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <ProgressBar
                    progress={student.progress}
                    showLabel
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(student.lastActive).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}