import { createClient } from '@/utils/supabase/server'
import StoolItem from './stool-item'
import { Stool } from '@/types/common'

export default async function StoolList() {
  const supabase = await createClient()
  const { data: stools, error }: { data: Stool[] | null; error: any } =
    await supabase
      .from('stool_records')
      .select()
      .order('created_at', { ascending: false })

  return (
    <>
      <h2 className="font-bold text-2xl mb-4"> Stool List</h2>
      <ul>
        {stools
          ? stools.map((stool) => (
              <li key={stool.id}>
                <StoolItem stool={stool} />
              </li>
            ))
          : 'No Stools found'}
      </ul>
    </>
  )
}
