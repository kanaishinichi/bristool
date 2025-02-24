import { Stool } from '@/types/common'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CalendarCell({ stool }: { stool: Stool }) {
  return (
    <Card className="my-1">
      <CardHeader>
        <CardTitle>Date</CardTitle>
      </CardHeader>
      <CardContent>{stool.scale}</CardContent>
    </Card>
  )
}
