import { createClient } from '@/utils/supabase/server'
import { Database, Tables } from '@/types/supabase'

type Stool = Tables<'stool_records'>
type User = Tables<'users'>
type UserAccount = Tables<'user_accounts'>

type UserAccountWithDetail = UserAccount & {
  detail: User
}

type UserAccountsQueryResult = {
  data: UserAccountWithDetail[] | null
  error: any | null
}

export async function getStoolRecordsByUserId(userId: string) {
  const supabase = await createClient()
  const { data: stools, error }: { data: Stool[] | null; error: any } =
    await supabase
      .from('stool_records')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

  return { stools, error }
}

export async function getDependentsByGuardianId(
  guardianId: string,
): Promise<UserAccountsQueryResult | null> {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('user_accounts')
    .select(
      `
      id,
      detail:user_accounts_id_fkey(*)`,
    )
    .eq('guardian_id', guardianId)) as UserAccountsQueryResult
  return { data, error }
}
