import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const stoolColorData = [
  { value: 1, label: "1 - 黒色", color: "#000000" },
  { value: 2, label: "2 - 濃い茶色", color: "#4B3621" },
  { value: 3, label: "3 - 茶色", color: "#8B4513" },
  { value: 4, label: "4 - 薄茶色", color: "#D2691E" },
  { value: 5, label: "5 - 黄土色", color: "#DAA520" },
  { value: 6, label: "6 - 黄色", color: "#FFD700" },
  { value: 7, label: "7 - 灰白色", color: "#D3D3D3" },
]

interface StoolColorSelectProps {
  value: number
  onChange: (value: number) => void
}

export default function StoolColorSelect({ value, onChange }: StoolColorSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">便の色 (1-7)</label>
      <RadioGroup value={value.toString()} onValueChange={(val) => onChange(Number.parseInt(val))}>
        {stoolColorData.map((item) => (
          <div key={item.value} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={item.value.toString()} id={`color-${item.value}`} />
            <Label htmlFor={`color-${item.value}`} className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span>{item.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

