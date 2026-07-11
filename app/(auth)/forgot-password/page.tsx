import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-50">
      <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white">Forgot password</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">We’ll help you reset your account securely.</p>
        <div className="mt-6 rounded-[18px] border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
          Demo mode: use the login page to continue with the sample credentials.
        </div>
        <Link href="/login" className="mt-6 inline-flex text-sm text-cyan-300 hover:text-cyan-200">
          Back to login
        </Link>
      </div>
    </main>
  )
}
