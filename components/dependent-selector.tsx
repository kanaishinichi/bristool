'use client'

import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { getDependentsByGuardianId } from '@/lib/data'

export default async function DependentSelector({
  guardianId,
}: {
  guardianId: string
}) {
  const dependents = await getDependentsByGuardianId(guardianId)
  const [selectedDependentId, setSelectedDependentId] = useState('')

  const handleDependentChange = (dependentId: string) => {
    setSelectedDependentId(dependentId)
    console.log('Dependent selected:', dependentId)
  }

  return (
    <div className="mb-8">
      <Select value={selectedDependentId} onValueChange={handleDependentChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="カテゴリを選択" />
        </SelectTrigger>
        <SelectContent>
          {dependents?.users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.display_name || 'Unknown'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
