{`'use client';

import { Logo } from '@/components/ui/logo';
import { AuthButton } from '@/components/auth/auth-button';
import { useAuth } from '@/lib/auth/hooks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap } from 'lucide-react';

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Logo />
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/courses">
            <Button variant="ghost" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Kursus
            </Button>
          </Link>
          {user?.role === 'instructor' && (
            <Link href="/instructor/dashboard">
              <Button variant="ghost" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Dashboard Instruktur
              </Button>
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};`}