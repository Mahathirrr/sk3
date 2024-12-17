export interface AccessToken {
  id: string;
  token: string;
  courseId: string;
  createdBy: string;
  usedBy: string | null;
  usedAt: string | null;
  expiresAt: string;
  createdAt: string;
}

export interface CreateAccessTokenData {
  courseId: string;
  createdBy: string;
  expiresAt?: string; // Optional, defaults to 30 days from creation
}

export interface UseAccessTokenData {
  token: string;
  userId: string;
}