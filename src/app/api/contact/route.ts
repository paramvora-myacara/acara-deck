import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { fullName, email, message } = await request.json()

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('contacts')
    .insert([{ full_name: fullName, email, message }])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Form submitted successfully!', data })
} 