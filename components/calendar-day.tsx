import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Stool } from '@/types/common'
import { CalendarCell } from './calendar-cell'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import StoolEditSheet from './stool-edit-sheet'

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
