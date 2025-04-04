'use client'

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import StoolEditSheetContent from './StoolEditSheetContent'
import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

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
