import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const stoolColorData = [
  {
    value: 1,
    label: '茶色',
    color: '#8B4513',
    description: '正常な色',
  },
  {
    value: 2,
    label: 'こげ茶色',
    color: '#654321',
    description: '濃い茶色',
  },
  {
    value: 3,
    label: '黄土色',
    color: '#C19A6B',
    description: '薄い茶色',
  },
  {
    value: 4,
    label: '黄色',
    color: '#FFD700',
    description: '黄色っぽい',
  },
  {
    value: 5,
    label: '緑色',
    color: '#228B22',
    description: '緑がかった色',
  },
  {
    value: 6,
    label: '黒色',
    color: '#000000',
    description: '黒っぽい',
  },
  {
    value: 7,
    label: '赤色',
    color: '#DC143C',
    description: '血が混じった色',
  },
  {
    value: 8,
    label: '白色',
    color: '#F5F5F5',
    description: '白っぽい',
  },
]

interface StoolColorSelectProps {
  value: number
  onChange: (value: number) => void
}

export default function StoolColorSelect({
  value,
  onChange,
}: StoolColorSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        便の色
      </label>
      <RadioGroup
        value={value.toString()}
        onValueChange={(val) => onChange(Number.parseInt(val))}
        className="grid grid-cols-4 gap-4"
      >
        {stoolColorData.map((item) => (
          <div
            key={item.value}
            className="flex flex-col items-center space-y-2"
          >
            <RadioGroupItem
              value={item.value.toString()}
              id={`color-${item.value}`}
              className="sr-only"
            />
            <Label
              htmlFor={`color-${item.value}`}
              className="flex flex-col items-center space-y-1 cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-center">{item.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}