import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// ユーザー登録
export async function signUp(formData: FormData) {
  'use server'
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    // エラー時は 'error' というクエリパラメータにメッセージを入れる
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // 成功時は日本語を直接書かず、キーワードを渡す
  redirect('/login?status=success')
}

// ログイン
export async function signIn(formData: FormData) {
  'use server'
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  redirect('/')
}

// ログアウト
export async function signOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
