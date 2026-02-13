'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import type { Procedure, ProcedureProgress } from '@/lib/types';

interface ProcedureCardProps {
  procedure: Procedure;
  progress?: ProcedureProgress | null;
  onClick?: () => void;
  showProgress?: boolean;
}

export function ProcedureCard({
  procedure,
  progress,
  onClick,
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
        return 'default';
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
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono">
                {procedure.category}
              </Badge>
              {showProgress && (
                <Badge variant={getStatusColor()}>
                  {progress?.status.replace('_', ' ') || 'not started'}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">
              {procedure.name}
            </CardTitle>
          </div>
          <div className="ml-2">
            {getStatusIcon()}
          </div>
        </div>

        {procedure.page_number && (
          <CardDescription className="text-sm">
            Page {procedure.page_number}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* 難度和時長 */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {procedure.difficulty_level && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Difficulty:</span>
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
                <span>{procedure.estimated_duration_minutes} min</span>
              </div>
            )}
          </div>

          {/* 進度條 */}
          {showProgress && progress && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Proficiency Level</span>
                <span>{progress.proficiency_level}/5</span>
              </div>
              <Progress value={getProficiencyLevel()} className="h-2" />
            </div>
          )}

          {/* 練習次數 */}
          {showProgress && progress && progress.practice_count > 0 && (
            <div className="text-xs text-muted-foreground">
              Practiced {progress.practice_count} time{progress.practice_count !== 1 ? 's' : ''}
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
  );
}
