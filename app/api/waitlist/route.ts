import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, school } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // ── OPTION A: Loops.so (recommended) ─────────────────────────────────────
    // Uncomment and configure if using Loops
    /*
    const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        userGroup: 'waitlist',
        source: 'landing_page',
        school: school || '',
        mailingLists: {
          [process.env.LOOPS_MAILING_LIST_ID as string]: true,
        },
      }),
    })
    if (!loopsRes.ok) {
      const err = await loopsRes.json()
      console.error('Loops error:', err)
      throw new Error('Failed to add to waitlist')
    }
    */

    // ── OPTION B: Mailchimp ────────────────────────────────────────────────────
    // Uncomment and configure if using Mailchimp
    /*
    const mailchimpRes = await fetch(
      `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`any:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0],
            LNAME: name.split(' ').slice(1).join(' ') || '',
            SCHOOL: school || '',
          },
          tags: ['waitlist', 'landing-page'],
        }),
      }
    )
    if (!mailchimpRes.ok) {
      const err = await mailchimpRes.json()
      if (err.title === 'Member Exists') {
        return NextResponse.json({ success: true, message: 'Already on the list!' })
      }
      throw new Error('Mailchimp error')
    }
    */

    // ── OPTION C: Supabase ────────────────────────────────────────────────────
    // Uncomment and configure if using Supabase
    /*
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    )
    const { error } = await supabase.from('waitlist').insert([{
      name,
      email,
      school: school || null,
      created_at: new Date().toISOString(),
      source: 'landing_page',
    }])
    if (error && error.code !== '23505') { // 23505 = unique violation (already exists)
      throw new Error(error.message)
    }
    */

    // ── DEFAULT: Console log for development ─────────────────────────────────
    // Remove this in production and uncomment one of the above options
    console.log('New waitlist signup:', { name, email, school, timestamp: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll be in touch very soon.",
    })

  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us at hello@claivis.org' },
      { status: 500 }
    )
  }
}
