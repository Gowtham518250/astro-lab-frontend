import Link from 'next/link'

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-50">
      <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white">Reset password</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">This demo flow is intentionally lightweight.</p>
        <Link href="/login" className="mt-6 inline-flex text-sm text-cyan-300 hover:text-cyan-200">
          Return to login
        </Link>
      </div>
    </main>
  )
}
