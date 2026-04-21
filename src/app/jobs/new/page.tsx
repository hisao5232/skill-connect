import { createJob } from '@/services/jobService'
import { redirect } from 'next/navigation'

export default function NewJobPage() {
  // Server Action: フォーム送信時に実行される処理
  async function handleSubmit(formData: FormData) {
    'use server' // サーバー側で実行することを宣言

    const rawFormData = {
      title: formData.get('title') as string,
      company_name: formData.get('company_name') as string,
      description: formData.get('description') as string,
      salary_range: formData.get('salary_range') as string,
      location: formData.get('location') as string,
    }

    await createJob(rawFormData)
    
    // 保存が終わったらトップページに戻る
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">新規求人を投稿する</h1>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">求人タイトル</label>
            <input name="title" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="例: Pythonエンジニア" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">会社名</label>
            <input name="company_name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="例: テック株式会社" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">場所</label>
            <input name="location" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="例: リモート / 東京都渋谷区" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">給与目安</label>
            <input name="salary_range" className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="例: 年収500万〜" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">仕事内容</label>
            <textarea name="description" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="仕事の詳細を入力してください"></textarea>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition">
              投稿する
            </button>
            <a href="/" className="flex-1 text-center bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition">
              キャンセル
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}
