import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

export function CalendarCell({ stool }: { stool: Stool }) {
  return (
    <Card className="my-1">
      <CardHeader>
        <CardTitle>{format(stool.date, 'HH:mm')}</CardTitle>
      </CardHeader>
      <CardContent>
        S:{stool.scale} V:{stool.volume} C:{stool.color}
      </CardContent>
    </Card>
  )
}
