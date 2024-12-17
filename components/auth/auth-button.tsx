{`'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/hooks';
import { supabase } from '@/lib/supabase/client';
import { LogIn, LogOut } from 'lucide-react';

export const AuthButton = () => {
  const { user, isLoading } = useAuth();

  const handleLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: \`\${window.location.origin}/auth/callback\`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <Button variant="ghost" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        Keluar
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => handleLogin('google')}
        className="gap-2"
      >
        <LogIn className="h-4 w-4" />
        Masuk dengan Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleLogin('github')}
        className="gap-2"
      >
        <LogIn className="h-4 w-4" />
        Masuk dengan GitHub
      </Button>
    </div>
  );
};`}