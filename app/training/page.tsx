'use client';

import { useTrainingPlans } from '@/lib/hooks/useTrainingPlans';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function TrainingPage() {
  const { plans, loading, error } = useTrainingPlans();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">我的訓練計劃</h1>
        <Button asChild variant="outline">
          <Link href="/">返回首頁</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">載入中...</p>
      ) : error ? (
        <p className="text-red-500">載入失敗：{error.message}</p>
      ) : plans.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">尚無訓練計劃</p>
          <p className="text-gray-400 mb-8">
            登入後即可建立個人化訓練計劃，追蹤您的臨床程序學習進度。
          </p>
          <Button asChild>
            <Link href="/procedures">先瀏覽程序</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </div>
                {plan.description && (
                  <CardDescription>{plan.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={plan.is_active ? 'default' : 'secondary'}>
                    {plan.is_active ? '進行中' : '已結束'}
                  </Badge>
                  {plan.start_date && (
                    <span className="text-sm text-muted-foreground">
                      {plan.start_date} ~ {plan.end_date || '未設定'}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
