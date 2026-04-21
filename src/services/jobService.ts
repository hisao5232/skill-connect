import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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
// 求人を新規登録する関数
export async function createJob(formData: {
  title: string
  company_name: string
  description: string
  salary_range: string
  location: string
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .insert([formData])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  // 保存後、一覧画面のキャッシュを更新して最新の状態にする
  revalidatePath('/')
  return data
}
