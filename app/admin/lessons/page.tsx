import Link from 'next/link'

export default function AdminLessonsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Lessons management</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">Lesson authoring tools will appear here.</p>
        <Link href="/admin" className="mt-6 inline-flex text-sm text-cyan-300 hover:text-cyan-200">
          Back to admin
        </Link>
      </div>
    </main>
  )
}
