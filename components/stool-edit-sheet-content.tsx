'use client'

import { useState, useActionState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Stool } from '@/types/common'

import {
  deleteStoolAction,
  insertStoolAction,
  updateStoolAction,
} from '@/app/actions'
import BristolScaleSelect from './bristol-scale-select'
import StoolColorSelect from './stool-color-select'

export default function StoolEditSheetContent({
  stool,
}: {
  stool: Stool | null
}) {
  const defaultDate = stool ? new Date(stool.date) : new Date()
  const defaultScale = stool ? stool.scale : 4
  const defaultVolume = stool ? stool.volume : 50
  const defaultColor = stool ? stool.color : 4

  const [date, setDate] = useState<Date>(defaultDate)
  const [time, setTime] = useState<string>(format(defaultDate, 'HH:mm'))
  const [scale, setBristolScale] = useState<number>(defaultScale)
  const [volume, setStoolVolume] = useState<number>(defaultVolume)
  const [color, setStoolColor] = useState<number>(defaultColor)

  async function handleSubmit(previousState: any, formData: FormData) {
    if (stool) {
      return updateStoolAction(previousState, formData)
    } else {
      return insertStoolAction(previousState, formData)
    }
  }
  const [submitState, submitAction] = useActionState(handleSubmit, {
    success: false,
  })
  const [deleteState, deleteAction] = useActionState(deleteStoolAction, {
    success: false,
  })

  return (
    <>
      <form action={submitAction} className="space-y-6">
        {stool && <input type="hidden" name="id" value={stool.id} />}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            排便日時
          </label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-[120px]"
              />
            </div>
          </div>
        </div>

        <input type="hidden" name="date" value={format(date, 'yyyy-MM-dd')} />
        <input type="hidden" name="time" value={time} />

        <BristolScaleSelect value={scale} onChange={setBristolScale} />
        <input type="hidden" name="bristolScale" value={scale} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            便の量 (0-100)
          </label>
          <Slider
            value={[volume]}
            onValueChange={(values) => setStoolVolume(values[0])}
            max={100}
            step={1}
          />
          <div className="text-sm text-gray-500">{volume}</div>
        </div>
        <input type="hidden" name="stoolVolume" value={volume} />

        <StoolColorSelect value={color} onChange={setStoolColor} />
        <input type="hidden" name="stoolColor" value={color} />

        <Button type="submit">送信</Button>

        {submitState.success && (
          <p className="text-green-600">送信が完了しました！</p>
        )}
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={stool?.id} />
        <Button type="submit">削除</Button>
      </form>
    </>
  )
}
