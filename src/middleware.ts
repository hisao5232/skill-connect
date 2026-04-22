import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()

  // 現在ログインしているユーザー情報を取得
  const { data: { user } } = await supabase.auth.getUser()

  // 未ログイン かつ 現在のページがログインページ以外 の場合、ログイン画面へ飛ばす
  if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ログイン済み かつ ログインページに行こうとしている場合、トップへ飛ばす
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// ミドルウェアを適用する範囲（画像やAPI、静的ファイルは除外する設定）
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
