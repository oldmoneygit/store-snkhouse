/**
 * Shopify Webhook Handler - Order Creation
 * Recebe webhooks do Shopify quando uma compra é finalizada
 * Envia evento Purchase para Meta Conversions API com userData completo
 */

import { NextResponse } from 'next/server'
import crypto from 'crypto'

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN
const API_VERSION = 'v21.0'

/**
 * Verifica autenticidade do webhook usando HMAC
 * @param {string} body - Raw body da requisição
 * @param {string} hmacHeader - Header X-Shopify-Hmac-SHA256
 * @returns {boolean}
 */
function verifyWebhook(body, hmacHeader) {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.warn('SHOPIFY_WEBHOOK_SECRET not configured')
    return false
  }

  const hash = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64')

  return hash === hmacHeader
}

/**
 * Hasheia um valor com SHA-256
 * @param {string} value
 * @returns {string}
 */
function hashValue(value) {
  if (!value) return null
  const normalized = value.toLowerCase().trim()
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

/**
 * Formata telefone para formato internacional
 * @param {string} phone
 * @returns {string}
 */
function formatPhone(phone) {
  if (!phone) return null
  // Remove tudo exceto números e +
  return phone.replace(/[^\d+]/g, '')
}

/**
 * Processa dados do pedido e envia para Conversions API
 */
export async function POST(request) {
  try {
    // Ler body raw para verificação HMAC
    const rawBody = await request.text()
    const hmacHeader = request.headers.get('x-shopify-hmac-sha256')

    // Verificar autenticidade do webhook
    if (!verifyWebhook(rawBody, hmacHeader)) {
      console.error('Webhook verification failed')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse do JSON
    const order = JSON.parse(rawBody)

    console.log('📦 Shopify Order Received:', {
      orderId: order.id,
      orderNumber: order.order_number,
      email: order.email,
      total: order.total_price,
    })

    // Se não tiver token da Conversions API, apenas loga e retorna sucesso
    if (!ACCESS_TOKEN) {
      console.warn('META_CONVERSIONS_API_TOKEN not configured')
      return NextResponse.json({ success: true, skipped: true })
    }

    // Extrair dados do cliente
    const customer = order.customer || {}
    const billing = order.billing_address || {}
    const shipping = order.shipping_address || {}

    // Preparar userData hasheado (formato ARRAY conforme doc Facebook)
    const userData = {}

    // Email (obrigatório)
    if (order.email) {
      userData.em = [hashValue(order.email)]
    }

    // Telefone
    const phone = billing.phone || shipping.phone || customer.phone
    if (phone) {
      userData.ph = [hashValue(formatPhone(phone))]
    }

    // Nome
    const firstName = billing.first_name || shipping.first_name || customer.first_name
    const lastName = billing.last_name || shipping.last_name || customer.last_name
    if (firstName) {
      userData.fn = [hashValue(firstName)]
    }
    if (lastName) {
      userData.ln = [hashValue(lastName)]
    }

    // Endereço
    const city = billing.city || shipping.city
    const province = billing.province || shipping.province
    const zip = billing.zip || shipping.zip
    const country = billing.country_code || shipping.country_code

    if (city) {
      userData.ct = [hashValue(city)]
    }
    if (province) {
      userData.st = [hashValue(province)]
    }
    if (zip) {
      userData.zp = [hashValue(zip)]
    }
    if (country) {
      userData.country = [hashValue(country)]
    }

    // ID externo do cliente
    if (customer.id) {
      userData.external_id = [customer.id.toString()]
    }

    // Preparar custom_data do evento Purchase
    const customData = {
      currency: order.currency || 'ARS',
      value: parseFloat(order.total_price),
      content_ids: order.line_items.map(item => item.product_id.toString()),
      content_type: 'product',
      contents: order.line_items.map(item => ({
        id: item.product_id.toString(),
        quantity: item.quantity,
        item_price: parseFloat(item.price),
      })),
      num_items: order.line_items.reduce((total, item) => total + item.quantity, 0),
      order_id: order.order_number.toString(),
    }

    // Gerar event_id único
    const eventId = `Purchase_${order.id}_${Date.now()}`

    // Preparar payload para Conversions API
    const eventPayload = {
      event_name: 'Purchase',
      event_time: Math.floor(new Date(order.created_at).getTime() / 1000),
      event_id: eventId,
      event_source_url: order.order_status_url || `https://snkhouseargentina.com`,
      action_source: 'website',
      user_data: {
        ...userData,
        // IP do cliente (se disponível)
        ...(order.browser_ip && { client_ip_address: order.browser_ip }),
      },
      custom_data: customData,
    }

    console.log('📤 Sending Purchase event to Conversions API:', {
      eventId,
      orderId: order.order_number,
      value: customData.value,
      currency: customData.currency,
      userDataPresent: Object.keys(userData).length,
    })

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
        { error: 'Failed to send Purchase event', details: result },
        { status: response.status }
      )
    }

    console.log('✅ Purchase event sent successfully:', {
      eventId,
      orderId: order.order_number,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    })

    return NextResponse.json({
      success: true,
      eventId,
      orderId: order.order_number,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}
