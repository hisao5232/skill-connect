import { createClient } from '@/lib/supabase/server'

export async function getJobs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data
}
