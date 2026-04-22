import { signIn, signUp } from '@/services/authService'

export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string; error?: string }> 
}) {
  const { status, error } = await searchParams

  // キーワードに応じて表示する文言を切り替える
  const message = status === 'success' ? '確認メールを送信しました。メールを確認してください。' : null

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">SkillConnect</h2>
        
        {/* メッセージの表示 */}
        {message && <p className="bg-green-50 text-green-600 p-3 rounded text-sm text-center">{message}</p>}
        {error && <p className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">{error}</p>}

        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full border p-3 rounded-lg text-gray-900" 
              placeholder="メールアドレス" 
            />
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6} // ブラウザ側で6文字以上を強制
              className="w-full border p-3 rounded-lg text-gray-900" 
              placeholder="パスワード (6文字以上)" 
            />
          </div>

          <div className="flex gap-4">
            <button formAction={signIn} className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
              ログイン
            </button>
            <button formAction={signUp} className="flex-1 border border-blue-600 text-blue-600 p-3 rounded-lg font-bold hover:bg-blue-50">
              新規登録
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
