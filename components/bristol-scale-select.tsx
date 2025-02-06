import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const bristolScaleData = [
  { value: 1, label: "1 - 硬くてコロコロの兎糞状の（排便困難）", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 2, label: "2 - ソーセージ状だが硬い", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 3, label: "3 - 表面にひび割れのあるソーセージ状", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 4, label: "4 - 滑らかで軟らかいソーセージ状、へび状", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 5, label: "5 - はっきりとした境界のある柔らかい小片", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 6, label: "6 - 境界がほぐれて、ふにゃふにゃの不定形", image: "https://placehold.jp/150x150.png?height=50&width=50" },
  { value: 7, label: "7 - 水様、固形物を含まない液状", image: "https://placehold.jp/150x150.png?height=50&width=50" },
]

interface BristolScaleSelectProps {
  value: number
  onChange: (value: number) => void
}

export default function BristolScaleSelect({ value, onChange }: BristolScaleSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">ブリストルスケール (1-7)</label>
      <RadioGroup value={value.toString()} onValueChange={(val) => onChange(Number.parseInt(val))}>
        {bristolScaleData.map((item) => (
          <div key={item.value} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={item.value.toString()} id={`bristol-${item.value}`} />
            <Label htmlFor={`bristol-${item.value}`} className="flex items-center space-x-2">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`Bristol Scale ${item.value}`}
                className="w-10 h-10 object-cover"
              />
              <span>{item.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

