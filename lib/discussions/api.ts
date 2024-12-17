{`import { supabase } from '@/lib/supabase/client';
import { Discussion, Comment } from './types';

export async function getDiscussions(courseId: string): Promise<Discussion[]> {
  const { data, error } = await supabase
    .from('discussions')
    .select(\`
      *,
      user:users (
        id,
        full_name,
        avatar_url
      ),
      _count {
        comments: comments(count)
      }
    \`)
    .eq('course_id', courseId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createDiscussion({
  courseId,
  title,
  content,
}: {
  courseId: string;
  title: string;
  content: string;
}): Promise<Discussion> {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error } = await supabase
    .from('discussions')
    .insert({
      course_id: courseId,
      user_id: user.user.id,
      title,
      content,
    })
    .select(\`
      *,
      user:users (
        id,
        full_name,
        avatar_url
      )
    \`)
    .single();

  if (error) throw error;
  return data;
}

export async function getComments(discussionId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(\`
      *,
      user:users (
        id,
        full_name,
        avatar_url
      )
    \`)
    .eq('discussion_id', discussionId)
    .is('parent_id', null)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Fetch replies for each comment
  const comments = await Promise.all(
    data.map(async (comment) => {
      const { data: replies } = await supabase
        .from('comments')
        .select(\`
          *,
          user:users (
            id,
            full_name,
            avatar_url
          )
        \`)
        .eq('parent_id', comment.id)
        .order('created_at', { ascending: true });

      return {
        ...comment,
        replies: replies || [],
      };
    })
  );

  return comments;
}

export async function createComment({
  discussionId,
  content,
  parentId,
}: {
  discussionId: string;
  content: string;
  parentId?: string;
}): Promise<Comment> {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error } = await supabase
    .from('comments')
    .insert({
      discussion_id: discussionId,
      user_id: user.user.id,
      content,
      parent_id: parentId,
    })
    .select(\`
      *,
      user:users (
        id,
        full_name,
        avatar_url
      )
    \`)
    .single();

  if (error) throw error;
  return data;
}`}