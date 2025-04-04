import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
// import { Stool } from '@/types/common'
import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

export default function ControlScore({ stools }: { stools: Stool[] | null }) {
  // スコア計算
  const score =
    stools && stools.length > 0
      ? stools.reduce((total: number, stool: Stool) => {
          const bristolScore = 100 - Math.abs((stool.scale ?? 0) - 4) * 20
          const volumeScore = 100 - Math.abs((stool.volume ?? 0) - 50) * 2
          const colorScore =
            stool.color != null && stool.color >= 3 && stool.color <= 4
              ? 100
              : 70
          return (
            total + (bristolScore * 0.5 + volumeScore * 0.3 + colorScore * 0.2)
          )
        }, 0) / stools.length
      : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>コントロールスコア</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span
            className={`text-5xl font-bold ${
              score >= 80
                ? 'text-green-600'
                : score >= 60
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {Math.round(score)}
          </span>
          <p className="text-lg mt-2">
            {score >= 80 ? '良好' : score >= 60 ? '普通' : '要注意'}
          </p>
        </div>
        <Progress value={score} className="h-2 mb-4" />
        <div className="grid grid-cols-3 text-sm text-center">
          <div>
            <p className="font-medium">Bristol Scale</p>
            <p className="text-muted-foreground">50%</p>
          </div>
          <div>
            <p className="font-medium">量</p>
            <p className="text-muted-foreground">30%</p>
          </div>
          <div>
            <p className="font-medium">色</p>
            <p className="text-muted-foreground">20%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
