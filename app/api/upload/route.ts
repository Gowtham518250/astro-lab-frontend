import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ ok: true, message: 'Upload API ready' })
}

export async function POST(request: Request) {
  return NextResponse.json({ ok: true, message: 'Upload API ready' })
}
