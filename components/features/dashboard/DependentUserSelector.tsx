'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type UserOption = {
  id: string
  name: string
}

export default function DependentUserSelector({
  userOptions,
  selectedUserId,
}: {
  userOptions: UserOption[]
  selectedUserId?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  let currentUserId: string | undefined
  supabase.auth.getUser().then((res) => {
    currentUserId = res.data.user?.id
  })

  // ユーザー選択時の処理
  const handleUserSelect = (id: string) => {
    // URLクエリパラメータを更新してページを再読み込み
    const params = new URLSearchParams()
    if (id === currentUserId) {
      params.delete('selectedUserId')
    } else {
      params.set('selectedUserId', id)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        関連ユーザーを選択
      </label>
      <Select value={selectedUserId} onValueChange={handleUserSelect}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="ユーザーを選択してください" />
        </SelectTrigger>
        <SelectContent>
          {userOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
