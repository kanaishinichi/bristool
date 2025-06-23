import { createClient } from '@/utils/supabase/server'

import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getDependentsByGuardianId } from '@/lib/data'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  const userId = user.id

  const dependentsResult = await getDependentsByGuardianId(user.id)
  const dependents = dependentsResult?.data?.map((user) => user.detail)
  const error = dependentsResult?.error
  // let { data: users, error } = await supabase
  //   .from('user_accounts')
  //   .select('id')
  //   .eq('guardian_id', user.id)

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          認証されたユーザーのみがアクセスできるデバッグページです
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">ユーザー情報</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
        <h2 className="font-bold text-2xl mb-4">管理対象ユーザー</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(dependents, null, 2)}
        </pre>
        {error && (
          <div className="text-red-500 text-sm">
            エラー: {error.message}
          </div>
        )}
      </div>
    </div>
  )
}
