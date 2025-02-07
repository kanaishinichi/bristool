import { createClient } from '@/utils/supabase/server'

type StoolProps = {
  stool: {
    id: string
    created_at: string
    user_id: string
    scale: string
    volume: number
    color: number
  }
}

export default function StoolItem({ stool }: StoolProps) {
  return (
    <div>
      {stool.created_at} Bristol Scale: {stool.scale} Volume: {stool.volume}{' '}
      Color: {stool.color}
    </div>
  )
}
