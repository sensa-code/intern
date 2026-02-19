'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import type { Procedure } from '@/lib/types';
import { getPrimaryName, getSecondaryName } from '@/lib/utils/display-name';
import { getDepartmentById, translateTag } from '@/lib/constants/departments';

export function ProcedureCard({ procedure }: { procedure: Procedure }) {
  return (
    <Link href={`/procedures/${procedure.id}`} className="block group">
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {(() => {
                const dept = getDepartmentById(procedure.department);
                return dept ? (
                  <Badge variant="outline" className={`text-xs ${dept.colorClasses.badge}`}>
                    {dept.name_zh}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="font-mono">
                    {procedure.category}
                  </Badge>
                );
              })()}
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

          {procedure.page_number != null && procedure.page_number > 0 && (
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

            {/* 標籤 */}
            {procedure.tags && procedure.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {procedure.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {translateTag(tag)}
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
