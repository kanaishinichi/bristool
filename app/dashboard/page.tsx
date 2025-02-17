import ControlScore from '@/components/control-score'
import CustomCalendar from '@/components/custom-calendar' // 新しいインポート
import { createClient } from '@/utils/supabase/server'

import { Stool } from '@/types/common'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: stools, error }: { data: Stool[] | null; error: any } =
    await supabase
      .from('stools')
      .select()
      .order('created_at', { ascending: false })

  // サンプルデータ
  // const records = [
  //   {
  //     id: '1',
  //     recorded_at: '2025-02-05T10:00:00Z',
  //     bristol_scale: 4,
  //     volume: 60,
  //     color: 3,
  //   },
  //   {
  //     id: '2',
  //     recorded_at: '2025-02-05T15:00:00Z',
  //     bristol_scale: 3,
  //     volume: 45,
  //     color: 4,
  //   },
  //   {
  //     id: '3',
  //     recorded_at: '2025-02-07T09:00:00Z',
  //     bristol_scale: 5,
  //     volume: 70,
  //     color: 4,
  //   },
  //   {
  //     id: '4',
  //     recorded_at: '2025-03-09T11:00:00Z',
  //     bristol_scale: 2,
  //     volume: 30,
  //     color: 5,
  //   },
  // ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">健康管理ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* コントロールスコア */}
        <ControlScore stools={stools ?? []} />

        {/* カスタムカレンダー */}
        <CustomCalendar stools={stools ?? []} />
      </div>
    </div>
  )
}
