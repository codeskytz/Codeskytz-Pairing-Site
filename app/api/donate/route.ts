import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch('https://api.codeskytz.site/api/payments/generate-link', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'codeskytz-api-key': 'codeskytz-B7hbs5wsc09h',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: body.amount,
        description: body.description,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to generate payment link' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Donation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}