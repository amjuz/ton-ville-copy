import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookie = await cookies()
  cookie.set('key', `${Math.random()}`)
  return NextResponse.json({ success: true }, { status: 200 })
}
