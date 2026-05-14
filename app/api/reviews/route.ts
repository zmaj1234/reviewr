import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VALID_STATUSES = ['pending_approval', 'posted', 'discarded', 'error']
const MAX_LIMIT = 100

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(searchParams.get('limit') ?? '25', 10)))
  const offset = (page - 1) * limit

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status filter' }, { status: 400 })
  }

  const { data: businesses } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)

  if (!businesses || businesses.length === 0) {
    return NextResponse.json({ reviews: [], total: 0, page, limit })
  }

  const businessIds = businesses.map((b: { id: string }) => b.id)

  let query = supabase
    .from('reviews')
    .select('*', { count: 'exact' })
    .in('business_id', businessIds)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    query = query.eq('status', status)
  }

  const { data: reviews, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    reviews: reviews ?? [],
    total: count ?? 0,
    page,
    limit,
  })
}
