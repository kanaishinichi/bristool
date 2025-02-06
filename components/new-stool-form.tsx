"use client"

import { useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import BristolScaleSelect from "./bristol-scale-select"
import StoolColorSelect from "./stool-color-select"
import { Input } from "@/components/ui/input"
import { submitNewStool } from "@/app/actions"

export default function NewStoolForm() {
  const now = new Date()
  const [date, setDate] = useState<Date>(now)
  const [time, setTime] = useState<string>(format(now, "HH:mm"))
  const [bristolScale, setBristolScale] = useState<number>(4)
  const [stoolVolume, setStoolVolume] = useState<number>(50)
  const [stoolColor, setStoolColor] = useState<number>(4)

  const [state, action] = useActionState(submitNewStool, { success: false })

  const handleSubmit = (formData: FormData) => {
    action(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">排便日時</label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
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
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-[120px]" />
          </div>
        </div>
      </div>

      <input type="hidden" name="date" value={format(date, "yyyy-MM-dd")} />
      <input type="hidden" name="time" value={time} />

      <BristolScaleSelect value={bristolScale} onChange={setBristolScale} />
      <input type="hidden" name="bristolScale" value={bristolScale} />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">便の量 (0-100)</label>
        <Slider value={[stoolVolume]} onValueChange={(values) => setStoolVolume(values[0])} max={100} step={1} />
        <div className="text-sm text-gray-500">{stoolVolume}</div>
      </div>
      <input type="hidden" name="stoolVolume" value={stoolVolume} />

      <StoolColorSelect value={stoolColor} onChange={setStoolColor} />
      <input type="hidden" name="stoolColor" value={stoolColor} />

      <Button type="submit">送信</Button>

      {state.success && <p className="text-green-600">送信が完了しました！</p>}
    </form>
  )
}

