// カレンダーセルコンポーネント
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Stool } from '@/types/common'

export default function StoolCalendarCell({
  stools,
}: {
  stools: Stool[] | null
}) {
  if (!stools || stools.length === 0) return null

  const getStoolColor = (scale: number) => {
    const colors = [
      '#cd7f32',
      '#8b4513',
      '#deb887',
      '#a0522d',
      '#6b4423',
      '#8b7355',
      '#998877',
    ]
    return colors[scale - 1] || '#a0522d'
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="w-full space-y-1">
          {stools.map((stool) => (
            <div key={stool.id} className="flex flex-col gap-0.5">
              <div
                className="w-full h-1 rounded-sm"
                style={{
                  backgroundColor: getStoolColor(stool.color),
                }}
                title={`Bristol Scale: ${stool.scale}`}
              />
              <div className="flex justify-center">
                <div
                  className="w-1 bg-blue-500 rounded-t opacity-60"
                  style={{
                    // height: `${Math.max(15, Math.min(60, stool.volume))}%`,
                    height: stool.volume,
                  }}
                  title={`Volume: ${stool.volume}`}
                />
              </div>
              <div
                className="text-center text-xs opacity-60"
                title={`Color: ${stool.color}`}
              >
                S:{stool.scale} V:{stool.volume} C:{stool.color}
              </div>
            </div>
          ))}
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-52">
        {stools.map((stool, index) => (
          <div key={stool.id} className="text-sm space-y-1">
            <p className="font-medium">記録 {index + 1}</p>
            <div className="pl-2 space-y-0.5">
              <p>Bristol Scale: {stool.scale}</p>
              <p>量: {stool.volume}</p>
              <p>色: {stool.color}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(stool.date).toLocaleTimeString('ja-JP')}
              </p>
            </div>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}
