import { createClient } from '@/utils/supabase/server'
import { Tables } from '@/types/supabase'

import Calendar from '@/components/calendar'
import ControlScore from '@/components/features/dashboard/ControlScore'
import { getDependentsByGuardianId, getStoolRecordsByUserId } from '@/lib/data'
import DependentUserSelector from '@/components/features/dashboard/DependentUserSelector'
import StoolList from '@/components/features/dashboard/StoolList'

type Stool = Tables<'stool_records'>

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { selectedUserId?: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>ログインが必要です</div>
  }

  const guardiansResult = await getDependentsByGuardianId(user?.id)
  const guardians = guardiansResult?.data
  const guardiansError = guardiansResult?.error

  if (guardiansError) {
    console.error('Error fetching guardians:', guardiansError)
  }

  const guardianOptions = guardians?.map((guardian) => ({
    id: guardian.id,
    name: guardian.detail.display_name ?? 'Unknown',
  }))

  const selectedUserId = (await searchParams).selectedUserId || user?.id

  let selectedUserDetails = null
  if (selectedUserId) {
    const { data: userData, error: userError } = await supabase
      .from('user_accounts')
      .select()
      .eq('id', selectedUserId)
      .single()

    if (userError) {
      console.error('Error fetching user details:', userError)
    } else {
      selectedUserDetails = userData
    }
  }

  const { stools, error: stoolsError } =
    await getStoolRecordsByUserId(selectedUserId)

  if (stoolsError) {
    console.error('Error fetching stool records:', stoolsError)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">健康管理ダッシュボード</h1>

      {guardianOptions && (
        <DependentUserSelector
          userOptions={guardianOptions}
          selectedUserId={selectedUserId}
        />
      )}
      <StoolList stools={stools} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControlScore stools={stools ?? []} />
        <Calendar stools={stools ?? []} />
      </div>
    </div>
  )
}
