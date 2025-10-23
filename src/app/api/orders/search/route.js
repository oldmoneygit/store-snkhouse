/**
 * API Route - Search Shopify Orders
 * Busca pedidos por email ou número do pedido
 * Suporta multi-país (Argentina e México)
 */

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

/**
 * Detecta o país baseado no hostname
 * @param {Headers} headersList
 * @returns {'AR' | 'MX'}
 */
function detectCountry(headersList) {
  const host = headersList.get('host') || ''

  if (host.includes('snkhousemexico.com') || host.includes('localhost:3001')) {
    return 'MX'
  }
  return 'AR' // Default Argentina
}

/**
 * Obtém credenciais do Shopify baseado no país
 * @param {'AR' | 'MX'} country
 * @returns {{domain: string, token: string}}
 */
function getShopifyCredentials(country) {
  if (country === 'MX') {
    return {
      domain: process.env.NEXT_PUBLIC_MX_SHOPIFY_DOMAIN,
      token: process.env.MX_SHOPIFY_ADMIN_TOKEN, // Admin API Token
    }
  }

  return {
    domain: process.env.NEXT_PUBLIC_AR_SHOPIFY_DOMAIN,
    token: process.env.AR_SHOPIFY_ADMIN_TOKEN, // Admin API Token
  }
}

/**
 * Busca pedidos no Shopify por email
 * @param {string} email
 * @param {string} domain
 * @param {string} token
 */
async function searchOrdersByEmail(email, domain, token) {
  const url = `https://${domain}/admin/api/2024-10/orders.json?email=${encodeURIComponent(email)}&status=any&limit=250`

  console.log('📡 Searching by email:', { email, domain })

  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Shopify API error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const data = await response.json()
  console.log('📦 Orders found by email:', data.orders?.length || 0)

  if (data.orders && data.orders.length > 0) {
    console.log('📋 Order names:', data.orders.map(o => o.name).join(', '))
  }

  return data.orders || []
}

/**
 * Busca pedido específico no Shopify por ID
 * @param {string} orderId
 * @param {string} domain
 * @param {string} token
 */
async function getOrderById(orderId, domain, token) {
  const url = `https://${domain}/admin/api/2024-10/orders/${orderId}.json`

  const response = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const data = await response.json()
  return data.order
}

/**
 * Busca pedido por número (order_number ou name)
 * @param {string} orderNumber
 * @param {string} domain
 * @param {string} token
 */
async function searchOrderByNumber(orderNumber, domain, token) {
  // Remover # se presente
  const cleanNumber = orderNumber.replace('#', '')

  console.log('🔍 Searching by number:', { cleanNumber, domain })

  // Método 1: Buscar por name (ex: #33511001)
  const urlByName = `https://${domain}/admin/api/2024-10/orders.json?name=${encodeURIComponent('#' + cleanNumber)}&status=any&limit=250`

  console.log('📡 Trying search by name:', urlByName)

  const response = await fetch(urlByName, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Shopify API error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const data = await response.json()
  console.log('📦 Orders found by name:', data.orders?.length || 0)

  if (data.orders && data.orders.length > 0) {
    console.log('✅ Order found:', {
      name: data.orders[0].name,
      email: data.orders[0].email,
      id: data.orders[0].id,
    })
    return data.orders[0]
  }

  // Método 2: Buscar sem o # no name
  const urlByNameNoHash = `https://${domain}/admin/api/2024-10/orders.json?name=${encodeURIComponent(cleanNumber)}&status=any&limit=250`

  console.log('📡 Trying search by name without #:', urlByNameNoHash)

  const response2 = await fetch(urlByNameNoHash, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  })

  if (response2.ok) {
    const data2 = await response2.json()
    console.log('📦 Orders found by name (no #):', data2.orders?.length || 0)

    if (data2.orders && data2.orders.length > 0) {
      console.log('✅ Order found:', {
        name: data2.orders[0].name,
        email: data2.orders[0].email,
        id: data2.orders[0].id,
      })
      return data2.orders[0]
    }
  }

  console.log('❌ Order not found by number')
  return null
}

/**
 * Formata dados do pedido para exibição
 * @param {Object} order - Order do Shopify
 */
function formatOrderData(order) {
  if (!order) return null

  // Status do pedido
  const fulfillmentStatus = order.fulfillment_status || 'unfulfilled'
  const financialStatus = order.financial_status || 'pending'

  // Determinar status geral
  let status = 'pending'
  if (fulfillmentStatus === 'fulfilled') {
    status = 'delivered'
  } else if (fulfillmentStatus === 'partial') {
    status = 'in_transit'
  } else if (financialStatus === 'paid') {
    status = 'confirmed'
  }

  // Informações de rastreamento (fulfillments)
  const fulfillments = order.fulfillments || []
  const trackingInfo = fulfillments.map(f => ({
    company: f.tracking_company || 'Transportadora',
    number: f.tracking_number,
    url: f.tracking_url,
    status: f.shipment_status,
  })).filter(t => t.number)

  // Histórico de eventos
  const history = []

  if (order.created_at) {
    history.push({
      date: new Date(order.created_at).toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pedido confirmado',
      location: 'SNKHOUSE',
    })
  }

  if (order.confirmed_at) {
    history.push({
      date: new Date(order.confirmed_at).toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pago confirmado',
      location: 'SNKHOUSE',
    })
  }

  fulfillments.forEach(f => {
    if (f.created_at) {
      history.push({
        date: new Date(f.created_at).toLocaleString('es-AR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'En tránsito',
        location: f.tracking_company || 'Transportadora',
      })
    }

    if (f.updated_at && f.shipment_status === 'delivered') {
      history.push({
        date: new Date(f.updated_at).toLocaleString('es-AR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Entregado',
        location: order.shipping_address?.city || 'Destino',
      })
    }
  })

  // Ordenar histórico do mais recente para o mais antigo
  history.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Localização atual
  let currentLocation = 'Centro de distribución - SNKHOUSE'
  if (trackingInfo.length > 0) {
    const lastTracking = trackingInfo[0]
    if (lastTracking.status === 'delivered') {
      currentLocation = order.shipping_address?.city || 'Entregado'
    } else if (lastTracking.company) {
      currentLocation = `En tránsito con ${lastTracking.company}`
    }
  }

  // Estimativa de entrega
  let estimatedDelivery = '5-7 días hábiles'
  if (status === 'delivered') {
    estimatedDelivery = 'Entregado'
  } else if (status === 'in_transit') {
    estimatedDelivery = '2-3 días hábiles'
  }

  return {
    orderNumber: order.name || `#${order.order_number}`,
    orderId: order.id,
    email: order.email,
    status,
    statusText: getStatusText(status),
    estimatedDelivery,
    currentLocation,
    trackingInfo,
    history,
    createdAt: order.created_at,
    financialStatus,
    fulfillmentStatus,
    total: parseFloat(order.total_price),
    currency: order.currency,
    shippingAddress: order.shipping_address,
    lineItems: order.line_items?.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price),
    })) || [],
  }
}

/**
 * Obtém texto do status em espanhol
 */
function getStatusText(status) {
  const statusMap = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    in_transit: 'En tránsito',
    delivered: 'Entregado',
  }
  return statusMap[status] || 'Procesando'
}

/**
 * POST /api/orders/search
 * Body: { email?: string, orderNumber?: string }
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { email, orderNumber } = body

    // Validar entrada
    if (!email && !orderNumber) {
      return NextResponse.json(
        { error: 'Email ou número do pedido é obrigatório' },
        { status: 400 }
      )
    }

    // Detectar país
    const headersList = headers()
    const country = detectCountry(headersList)
    const { domain, token } = getShopifyCredentials(country)

    console.log('🔍 Searching order:', {
      country,
      domain,
      email: email || 'N/A',
      orderNumber: orderNumber || 'N/A',
    })

    // Validar credenciais
    if (!domain || !token) {
      console.error('❌ Missing Shopify credentials:', { domain: !!domain, token: !!token, country })
      return NextResponse.json(
        {
          error: 'Configuração do Shopify não encontrada',
          details: 'Por favor, configure o Admin API Token no .env.local. Veja: docs/SHOPIFY_ADMIN_TOKEN_SETUP.md'
        },
        { status: 500 }
      )
    }

    let orders = []

    // Estratégia 1: Buscar por email PRIMEIRO (mais confiável)
    if (email) {
      console.log('📧 Strategy 1: Search by email first')
      orders = await searchOrdersByEmail(email, domain, token)

      // Se orderNumber foi fornecido, filtrar pelo número específico
      if (orderNumber && orders.length > 0) {
        const cleanNumber = orderNumber.replace('#', '')
        console.log('🔍 Filtering by order number:', cleanNumber)

        const filtered = orders.filter(o => {
          const matchName = o.name === `#${cleanNumber}`
          const matchNumber = o.order_number?.toString() === cleanNumber
          const matchId = o.id?.toString() === cleanNumber

          console.log('🔎 Checking order:', {
            name: o.name,
            order_number: o.order_number,
            id: o.id,
            matchName,
            matchNumber,
            matchId,
          })

          return matchName || matchNumber || matchId
        })

        console.log('📦 Orders after filter:', filtered.length)
        orders = filtered
      }
    }

    // Estratégia 2: Buscar por número do pedido (se email não fornecido ou não encontrou)
    if (orders.length === 0 && orderNumber) {
      console.log('🔢 Strategy 2: Search by order number')
      const order = await searchOrderByNumber(orderNumber, domain, token)
      if (order) {
        // Se email foi fornecido, validar que pertence ao mesmo email
        if (email && order.email?.toLowerCase() !== email.toLowerCase()) {
          console.log('❌ Email does not match order email')
          return NextResponse.json(
            { error: 'Pedido não encontrado ou email não corresponde' },
            { status: 404 }
          )
        }
        orders = [order]
      }
    }

    // Verificar se encontrou pedidos
    if (!orders || orders.length === 0) {
      console.log('❌ No orders found')
      return NextResponse.json(
        {
          error: 'Nenhum pedido encontrado com os dados fornecidos',
          details: 'Verifique se o email e número do pedido estão corretos',
          searched: {
            email: email || null,
            orderNumber: orderNumber || null,
            country,
          }
        },
        { status: 404 }
      )
    }

    // Formatar dados do primeiro pedido (mais recente)
    const formattedOrder = formatOrderData(orders[0])

    console.log('✅ Order found:', {
      orderNumber: formattedOrder.orderNumber,
      status: formattedOrder.status,
    })

    return NextResponse.json({
      success: true,
      order: formattedOrder,
      totalOrders: orders.length,
    })
  } catch (error) {
    console.error('Order search error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedido', message: error.message },
      { status: 500 }
    )
  }
}
