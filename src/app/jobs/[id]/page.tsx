import { getJobById, deleteJob } from '@/services/jobService'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DeleteButton from '@/components/functional/DeleteButton'

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJobById(id)

  // 求人が見つからない場合は404ページを表示
  if (!job) {
    notFound()
  }

  // サーバー側で実行する削除ロジック
  async function handleDelete() {
    'use server'
    await deleteJob(id)
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-600 hover:underline">← 一覧に戻る</Link>
          
          <div className="flex gap-2">
            {/* 編集ページへのリンク：hrefでIDを指定して特定の編集画面へ飛ばします */}
            <Link 
                href={`/jobs/${id}/edit`} 
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition"
            >
                編集
            </Link>
            
            {/* 分離したボタンを使う */}
            <DeleteButton handleDelete={handleDelete} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {job.location}
            </span>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">企業情報</h2>
              <p className="text-xl text-gray-900 font-medium">{job.company_name}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">給与・待遇</h2>
              <p className="text-gray-900">{job.salary_range || '未定義'}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">仕事内容</h2>
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t">
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg">
              この求人に応募する（シミュレーション）
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
