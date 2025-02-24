'use client'

import { useState, useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { insertStoolAction, updateStoolAction } from '@/app/actions'
import { format } from 'date-fns'
import { CalendarIcon, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import BristolScaleSelect from './bristol-scale-select'
import StoolColorSelect from './stool-color-select'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import StoolEditSheetContent from './stool-edit-sheet-content'
import { Stool } from '@/types/common'

export default function StoolEditSheet({
  stool,
  title,
}: {
  stool: Stool | null
  title: string
}) {
  return (
    <ScrollArea className="h-max">
      <SheetContent className="h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Edit or create new record.</SheetDescription>
        </SheetHeader>
        <StoolEditSheetContent stool={stool} />
      </SheetContent>
    </ScrollArea>
  )
}
