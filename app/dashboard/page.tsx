'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StoolCalendarCell from '@/components/stool-calendar-cell'

export default function Home() {
  // サンプルデータ
  const records = [
    {
      id: '1',
      recorded_at: '2025-02-05T10:00:00Z',
      bristol_scale: 4,
      volume: 60,
      color: 3,
    },
    {
      id: '2',
      recorded_at: '2025-02-05T15:00:00Z',
      bristol_scale: 3,
      volume: 45,
      color: 4,
    },
    {
      id: '3',
      recorded_at: '2025-02-07T09:00:00Z',
      bristol_scale: 5,
      volume: 70,
      color: 4,
    },
    {
      id: '4',
      recorded_at: '2025-02-09T11:00:00Z',
      bristol_scale: 2,
      volume: 30,
      color: 5,
    },
  ]

  const [currentDate, setCurrentDate] = useState(new Date())

  // カレンダー関連の関数
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    )
  }

  const getDayRecords = (date) => {
    return records.filter((record) => {
      const recordDate = new Date(record.recorded_at)
      return recordDate.toDateString() === date.toDateString()
    })
  }

  // 月の日付配列を生成
  const daysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // 前月の日付を追加
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthDays - i,
        ),
        isCurrentMonth: false,
      })
    }

    // 現在の月の日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        isCurrentMonth: true,
      })
    }

    // 次月の日付を追加（6週間分になるまで）
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          i,
        ),
        isCurrentMonth: false,
      })
    }

    return days
  }

  const weekDays = ['日', '月', '火', '水', '木', '金', '土']
  const monthName = currentDate.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
  })

  // スコア計算
  const score =
    records.reduce((total, record) => {
      const bristolScore = 100 - Math.abs(record.bristol_scale - 4) * 20
      const volumeScore = 100 - Math.abs(record.volume - 50) * 2
      const colorScore = record.color >= 3 && record.color <= 4 ? 100 : 70
      return total + (bristolScore * 0.5 + volumeScore * 0.3 + colorScore * 0.2)
    }, 0) / records.length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">健康管理ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* コントロールスコア */}
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

        {/* カスタムカレンダー */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>記録カレンダー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {/* カレンダーヘッダー */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{monthName}</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* カレンダーグリッド */}
              <div className="grid grid-cols-7 gap-px bg-muted">
                {/* 曜日ヘッダー */}
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center py-2 font-medium bg-background"
                  >
                    {day}
                  </div>
                ))}

                {/* 日付セル */}
                {daysArray().map(({ date, isCurrentMonth }) => (
                  <div
                    key={date.toISOString()}
                    className={`min-h-24 p-1 bg-background relative ${
                      !isCurrentMonth && 'text-muted-foreground'
                    }`}
                  >
                    <div className="absolute top-1 left-1 text-sm">
                      {date.getDate()}
                    </div>
                    <div className="pt-6">
                      <StoolCalendarCell records={getDayRecords(date)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex gap-8 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-6 rounded"
                    style={{ backgroundColor: '#a0522d' }}
                  />
                  <span>Bristol Scale (色)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-2 bg-blue-500" />
                  <span>Volume (高さ)</span>
                </div>
              </div>
              <div className="text-center text-sm">
                <span>Color: C1-C7で表示</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
