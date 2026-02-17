'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import type { Procedure, ProcedureProgress } from '@/lib/types';
import { getPrimaryName, getSecondaryName } from '@/lib/utils/display-name';

interface ProcedureCardProps {
  procedure: Procedure;
  progress?: ProcedureProgress | null;
  showProgress?: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  completed: '已完成',
  mastered: '已精通',
  in_progress: '學習中',
  not_started: '未開始',
};

export function ProcedureCard({
  procedure,
  progress,
  showProgress = false,
}: ProcedureCardProps) {
  const getStatusIcon = () => {
    if (!progress) return <Circle className="h-4 w-4 text-gray-400" />;

    switch (progress.status) {
      case 'completed':
      case 'mastered':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (): "default" | "secondary" | "outline" | "destructive" => {
    if (!progress) return 'default';

    switch (progress.status) {
      case 'completed':
      case 'mastered':
        return 'default';
      case 'in_progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getProficiencyLevel = () => {
    if (!progress || !progress.proficiency_level) return 0;
    return (progress.proficiency_level / 5) * 100;
  };

  return (
    <Link href={`/procedures/${procedure.id}`} className="block group">
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono">
                  {procedure.category}
                </Badge>
                {showProgress && (
                  <Badge variant={getStatusColor()}>
                    {STATUS_LABELS[progress?.status || 'not_started'] || '未開始'}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {getPrimaryName(procedure)}
              </CardTitle>
              {getSecondaryName(procedure) && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {getSecondaryName(procedure)}
                </p>
              )}
            </div>
            <div className="ml-2">
              {getStatusIcon()}
            </div>
          </div>

          {procedure.page_number && (
            <CardDescription className="text-sm">
              第 {procedure.page_number} 頁
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* 難度和時長 */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {procedure.difficulty_level && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">難度：</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i < procedure.difficulty_level!
                            ? 'bg-orange-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {procedure.estimated_duration_minutes && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{procedure.estimated_duration_minutes} 分鐘</span>
                </div>
              )}
            </div>

            {/* 進度條 */}
            {showProgress && progress && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>熟練度</span>
                  <span>{progress.proficiency_level}/5</span>
                </div>
                <Progress value={getProficiencyLevel()} className="h-2" />
              </div>
            )}

            {/* 練習次數 */}
            {showProgress && progress && progress.practice_count > 0 && (
              <div className="text-xs text-muted-foreground">
                已練習 {progress.practice_count} 次
              </div>
            )}

            {/* 標籤 */}
            {procedure.tags && procedure.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {procedure.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {procedure.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{procedure.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Skeleton loading 元件
 */
export function ProcedureCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-8 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
          </div>
          <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="h-4 w-16 rounded bg-gray-100 animate-pulse mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="h-4 w-20 rounded bg-gray-100 animate-pulse" />
            <div className="h-4 w-16 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
