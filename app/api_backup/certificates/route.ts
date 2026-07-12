import { NextRequest, NextResponse } from 'next/server'
import { getUserCertificates, getAllCertificates, getCertificateById } from '@/services/certificate.service'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

// ─── GET /api/certificates ────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const certId = searchParams.get('id')

    if (certId) {
      const cert = await getCertificateById(certId)
      if (!cert) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
      return NextResponse.json(cert)
    }

    if (user.role === 'ADMIN') {
      const page = parseInt(searchParams.get('page') ?? '1', 10)
      return NextResponse.json(await getAllCertificates(page))
    }

    const certificates = await getUserCertificates(user.id)
    return NextResponse.json({ certificates })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
