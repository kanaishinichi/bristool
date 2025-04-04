import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

import { CalendarCell } from './CalendarCell'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import StoolEditSheet from './edit-sheet/StoolEditSheet'

export function CalendarDay({
  date,
  isCurrentMonth,
  stools,
}: {
  date: Date
  isCurrentMonth: boolean
  stools: Stool[] | null
}) {
  return (
    <div
      className={`min-h-24 p-1 bg-background relative
    ${!isCurrentMonth && 'text-muted-foreground'}`}
    >
      <div className="top-1 left-1 text-sm">{date.getDate()}</div>
      {stools?.map((stool) => (
        <Sheet key={stool.id}>
          <SheetTrigger>
            <CalendarCell stool={stool} />
          </SheetTrigger>
          <StoolEditSheet stool={stool} title="Edit Record" />
        </Sheet>
      ))}
    </div>
  )
}
