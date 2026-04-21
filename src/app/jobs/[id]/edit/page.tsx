import { getJobById, updateJob } from '@/services/jobService'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) notFound()

// Server Action: 編集内容を保存する処理
  async function handleUpdate(formData: FormData) {
    'use server'

    const updatedData = {
      title: formData.get('title') as string,
      company_name: formData.get('company_name') as string,
      description: formData.get('description') as string,
      salary_range: formData.get('salary_range') as string,
      location: formData.get('location') as string,
    }

    await updateJob(id, updatedData)

    // 更新後はその求人の詳細ページに戻る
    redirect(`/jobs/${id}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">求人を編集する</h1>

        <form action={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">求人タイトル</label>
            <input name="title" defaultValue={job.title} required className="mt-1 block w-full border rounded-md p-2 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">会社名</label>
            <input name="company_name" defaultValue={job.company_name} required className="mt-1 block w-full border rounded-md p-2 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">場所</label>
            <input name="location" defaultValue={job.location || ''} required className="mt-1 block w-full border rounded-md p-2 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">給与目安</label>
            <input name="salary_range" defaultValue={job.salary_range || ''} className="mt-1 block w-full border rounded-md p-2 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">仕事内容</label>
            <textarea name="description" defaultValue={job.description || ''} rows={6} className="mt-1 block w-full border rounded-md p-2 text-gray-900" />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition">
              更新する
            </button>
            <a href={`/jobs/${id}`} className="flex-1 text-center bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition">
              キャンセル
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}
