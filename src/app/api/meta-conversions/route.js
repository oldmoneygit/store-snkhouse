/**
 * Meta Conversions API Route (Server-Side)
 * Envia eventos do servidor para Facebook Conversions API
 * Trabalha em conjunto com o Pixel para deduplicação via event_id
 */

import { NextResponse } from 'next/server'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN
const API_VERSION = 'v21.0'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      eventName,
      eventData,
      eventId,
      fbc,
      fbp,
      eventTime,
      sourceUrl,
      userAgent,
    } = body

    // Validação básica
    if (!eventName || !eventId) {
      return NextResponse.json(
        { error: 'eventName and eventId are required' },
        { status: 400 }
      )
    }

    // Se não houver token configurado, retorna sucesso mas não envia
    if (!ACCESS_TOKEN) {
      console.warn('META_CONVERSIONS_API_TOKEN not configured')
      return NextResponse.json({ success: true, skipped: true })
    }

    // Preparar dados do evento para Conversions API
    const eventPayload = {
      event_name: eventName,
      event_time: eventTime || Math.floor(Date.now() / 1000),
      event_id: eventId, // CRÍTICO: mesmo event_id do Pixel para deduplicação
      event_source_url: sourceUrl,
      action_source: 'website',
      user_data: {
        client_ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        client_user_agent: userAgent,
        ...(fbc && { fbc }), // Facebook Click ID
        ...(fbp && { fbp }), // Facebook Browser ID
      },
      custom_data: {
        ...eventData,
      },
    }

    // Enviar para Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventPayload],
          access_token: ACCESS_TOKEN,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Facebook Conversions API Error:', result)
      return NextResponse.json(
        { error: 'Failed to send event to Conversions API', details: result },
        { status: response.status }
      )
    }

    console.log(`Conversions API - ${eventName} sent successfully:`, {
      eventId,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    })

    return NextResponse.json({
      success: true,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    })
  } catch (error) {
    console.error('Conversions API Route Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}
