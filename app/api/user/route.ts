import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { full_name } = await req.json()
  if (typeof full_name !== 'string' || !full_name.trim()) {
    return NextResponse.json({ error: 'full_name is required' }, { status: 400 })
  }

  const { error } = await supabase.auth.updateUser({ data: { full_name: full_name.trim() } })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
