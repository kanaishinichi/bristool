import { useState } from 'react'

import { PopoverContent } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Select, SelectItem, SelectContent } from '@/components/ui/select'

import { Stool } from '@/types/common'
import { SelectTrigger, SelectValue } from '@radix-ui/react-select'

export default function StoolPopoverContent({
  stools,
  setOpen,
}: {
  stools: Stool[]
  setOpen: (open: boolean) => void
}) {
  const [editingStool, setEditingStool] = useState<Stool | null>(null)

  const handleEdit = (stool: Stool) => {
    setEditingStool(stool)
  }

  const handleDelete = (stoolId: string) => {
    // 削除処理をここに追加
    console.log('Delete stool:', stoolId)
  }

  const handleSave = (updatedStool: Stool) => {
    // 保存処理をここに追加
    console.log('Save stool:', updatedStool)
    setEditingStool(null)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <PopoverContent align="start" className="w-52 relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
      {stools.map((stool, index) => (
        <div key={stool.id} className="text-sm space-y-1">
          {editingStool && editingStool.id === stool.id ? (
            <div className="space-y-2">
              <h2 className="text-lg font-medium">編集</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSave(editingStool)
                }}
              >
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm">Bristol Scale</label>
                    <div>
                      <Select
                        defaultValue={String(editingStool.scale)}
                        onValueChange={(value) =>
                          setEditingStool({
                            ...editingStool,
                            scale: Number(value),
                          })
                        }
                      >
                        <SelectTrigger className="w-full border rounded px-2 py-1">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <SelectItem key={value} value={String(value)}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm">量</label>
                    <Slider
                      defaultValue={[editingStool.volume]}
                      onChange={(value) =>
                        setEditingStool({
                          ...editingStool,
                          volume: Number(value),
                        })
                      }
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">色</label>
                    <div className="w-full border rounded px-2 py-1">
                      <Select
                        defaultValue={String(editingStool.color)}
                        onValueChange={(value) =>
                          setEditingStool({
                            ...editingStool,
                            color: Number(value),
                          })
                        }
                      >
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <SelectItem key={value} value={String(value)}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingStool(null)}
                    className="px-4 py-2 border rounded"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <p className="font-medium">記録 {index + 1}</p>
              <div className="pl-2 space-y-0.5">
                <p>Bristol Scale: {stool.scale}</p>
                <p>量: {stool.volume}</p>
                <p>色: {stool.color}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(stool.date).toLocaleTimeString('ja-JP')}
                </p>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(stool)}
                >
                  編集
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(stool.id)}
                >
                  削除
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </PopoverContent>
  )
}
