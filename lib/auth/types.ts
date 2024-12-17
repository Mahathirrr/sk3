{`export type AuthUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: 'student' | 'instructor';
};

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
};`}