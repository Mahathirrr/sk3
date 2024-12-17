'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

export function ProgressBar({ progress, showLabel = true }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      {showLabel && (
        <p className="text-sm text-muted-foreground">
          {Math.round(progress)}% selesai
        </p>
      )}
    </div>
  );
}