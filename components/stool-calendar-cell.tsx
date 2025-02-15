// カレンダーセルコンポーネント
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function StoolCalendarCell({ records }) {
  if (records.length === 0) return null

  const getBristolColor = (scale: number) => {
    const colors = [
      '#cd7f32',
      '#8b4513',
      '#deb887',
      '#a0522d',
      '#6b4423',
      '#8b7355',
      '#998877',
    ]
    return colors[scale + 1] || '#a0522d'
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="w-full space-y-1">
          {records.map((record) => (
            <div key={record.id} className="flex flex-col gap-0.5">
              <div
                className="w-full h-1 rounded-sm"
                style={{
                  backgroundColor: getBristolColor(record.bristol_scale),
                }}
                title={`Bristol Scale: ${record.bristol_scale}`}
              />
              <div className="flex justify-center">
                <div
                  className="w-1 bg-blue-500 rounded-t opacity-60"
                  style={{
                    height: `${Math.max(15, Math.min(60, record.volume))}%`,
                  }}
                  title={`Volume: ${record.volume}`}
                />
              </div>
              <div
                className="text-center text-xs opacity-60"
                title={`Color: ${record.color}`}
              >
                C{record.color}
              </div>
            </div>
          ))}
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-52">
        {records.map((record, index) => (
          <div key={record.id} className="text-sm space-y-1">
            <p className="font-medium">記録 {index + 1}</p>
            <div className="pl-2 space-y-0.5">
              <p>Bristol Scale: {record.bristol_scale}</p>
              <p>量: {record.volume}</p>
              <p>色: {record.color}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(record.recorded_at).toLocaleTimeString('ja-JP')}
              </p>
            </div>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}
