import Link from 'next/link'

export default function AdminCourseDetailPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Admin course detail</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">This placeholder route is ready for the full admin editor experience.</p>
        <Link href="/admin/courses" className="mt-6 inline-flex text-sm text-cyan-300 hover:text-cyan-200">
          Back to courses
        </Link>
      </div>
    </main>
  )
}
