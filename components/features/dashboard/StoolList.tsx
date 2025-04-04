import { createClient } from '@/utils/supabase/server'
import StoolItem from './StoolItem'
import { Tables } from '@/types/supabase'
type Stool = Tables<'stool_records'>

export default async function StoolList({
  stools,
}: {
  stools: Stool[] | null
}) {
  return (
    <>
      {/* <h2 className="font-bold text-2xl mb-4"> Stool List</h2> */}
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
