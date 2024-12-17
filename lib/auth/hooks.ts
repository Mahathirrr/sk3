{`'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { AuthState, AuthUser } from './types';

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setState({
            user: profile ? {
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              avatarUrl: profile.avatar_url,
              role: profile.role,
            } : null,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};`}