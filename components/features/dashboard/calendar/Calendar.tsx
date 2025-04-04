'use client'

import { useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { daysArray } from '@/utils/calendar'
import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'

import { CalendarDay } from './CalendarDay'
import StoolEditSheet from './edit-sheet/StoolEditSheet'

const Calendar = ({ stools }: { stools: Stool[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const weekDays = ['日', '月', '火', '水', '木', '金', '土']
  const monthName = currentDate.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
  })

  const getDayRecords = (date: Date) => {
    return stools?.filter((stool) => {
      const recordDate = new Date(stool.date)
      return recordDate.toDateString() === date.toDateString()
    })
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

  return (
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
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
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
            {daysArray(currentDate).map(({ date, isCurrentMonth }) => (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                isCurrentMonth={isCurrentMonth}
                stools={getDayRecords(date) || null}
              />
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
  )
}

export default Calendar
