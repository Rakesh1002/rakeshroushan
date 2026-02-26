import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/payload'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const result = await subscribeToNewsletter(email, firstName, 'blog')

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
