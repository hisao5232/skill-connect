import { getJobs } from '@/services/jobService'

export default async function Home() {
  const jobs = await getJobs()

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          求人一覧（SkillConnect）
        </h1>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-blue-600">{job.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {job.location}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-medium text-gray-900">{job.company_name}</span>
                <span>{job.salary_range}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
