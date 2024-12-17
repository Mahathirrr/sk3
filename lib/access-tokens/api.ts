import { supabase } from '@/lib/supabase/client';
import { nanoid } from 'nanoid';
import { AccessToken, CreateAccessTokenData, UseAccessTokenData } from './types';

export async function createAccessToken(
  data: CreateAccessTokenData
): Promise<AccessToken> {
  const token = nanoid(16); // Generate a unique 16-character token
  const expiresAt = data.expiresAt || new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now
  ).toISOString();

  const { data: accessToken, error } = await supabase
    .from('access_tokens')
    .insert({
      token,
      course_id: data.courseId,
      created_by: data.createdBy,
      expires_at: expiresAt,
    })
    .select()
    .single();

  if (error) throw error;
  return accessToken;
}

export async function useAccessToken(
  data: UseAccessTokenData
): Promise<AccessToken> {
  // Start a transaction to validate and use the token
  const { data: token, error: fetchError } = await supabase
    .from('access_tokens')
    .select()
    .eq('token', data.token)
    .is('used_by', null)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (fetchError || !token) {
    throw new Error('Token invalid atau sudah digunakan');
  }

  // Update the token as used
  const { data: updatedToken, error: updateError } = await supabase
    .from('access_tokens')
    .update({
      used_by: data.userId,
      used_at: new Date().toISOString(),
    })
    .eq('id', token.id)
    .select()
    .single();

  if (updateError) throw updateError;

  // Create enrollment for the user
  const { error: enrollmentError } = await supabase
    .from('enrollments')
    .insert({
      user_id: data.userId,
      course_id: token.course_id,
      status: 'active',
      progress: 0,
    });

  if (enrollmentError) throw enrollmentError;

  return updatedToken;
}