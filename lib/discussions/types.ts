{`import { Database } from '@/lib/supabase/types';

export type Discussion = Database['public']['Tables']['discussions']['Row'] & {
  user: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  _count?: {
    comments: number;
  };
};

export type Comment = Database['public']['Tables']['comments']['Row'] & {
  user: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  replies?: Comment[];
};`}