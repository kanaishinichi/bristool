import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

export default function StoolItem({ stool }: { stool: Stool }) {
  return (
    <div>
      {stool.created_at} Bristol Scale: {stool.scale} Volume: {stool.volume}{' '}
      Color: {stool.color}
    </div>
  )
}
