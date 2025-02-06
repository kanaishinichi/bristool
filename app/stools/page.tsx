import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: stools } = await supabase.from("stools").select();

  return <pre>{JSON.stringify(stools, null, 2)}</pre>
}