{`'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { CreateDiscussionDialog } from './create-discussion-dialog';
import { Discussion } from '@/lib/discussions/types';

interface DiscussionListProps {
  courseId: string;
  discussions: Discussion[];
  onDiscussionCreated: () => void;
}

export function DiscussionList({
  courseId,
  discussions,
  onDiscussionCreated,
}: DiscussionListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forum Diskusi</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Buat Diskusi Baru
        </Button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={discussion.user.avatar_url} />
                  <AvatarFallback>
                    {discussion.user.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{discussion.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {discussion.user.full_name} •{' '}
                    {formatDistanceToNow(new Date(discussion.created_at), {
                      addSuffix: true,
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{discussion.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                {discussion._count?.comments || 0} Komentar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateDiscussionDialog
        courseId={courseId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDiscussionCreated={onDiscussionCreated}
      />
    </div>
  );
}`}