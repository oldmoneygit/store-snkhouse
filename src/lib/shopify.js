/**
 * Shopify Storefront API Integration
 *
 * This library handles all interactions with Shopify Storefront API
 * for creating checkouts and managing products.
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10'

/**
 * Makes a GraphQL request to Shopify Storefront API
 * @param {string} query - GraphQL query string
 * @param {object} variables - GraphQL variables
 * @returns {Promise<object>} - API response
 */
async function shopifyFetch(query, variables = {}) {
  if (!domain || !storefrontAccessToken) {
    throw new Error(
      'Shopify credentials not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    )
  }

  const url = `https://${domain}/api/${apiVersion}/graphql.json`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json.data
  } catch (error) {
    console.error('Shopify API request failed:', error)
    throw error
  }
}

/**
 * Creates a cart with line items (updated to use Cart API)
 *
 * @param {Array} lineItems - Array of items with format:
 *   [{ variantId: "gid://shopify/ProductVariant/123", quantity: 2 }]
 *
 * @returns {Promise<object>} Cart object with checkoutUrl for redirect
 *
 * @example
 * const cart = await createCheckout([
 *   { variantId: "gid://shopify/ProductVariant/123", quantity: 1 },
 *   { variantId: "gid://shopify/ProductVariant/456", quantity: 2 }
 * ])
 *
 * // Redirect to checkout
 * window.location.href = cart.checkoutUrl
 */
export async function createCheckout(lineItems) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    },
  }

  const data = await shopifyFetch(query, variables)

  if (data.cartCreate.userErrors.length > 0) {
    const errors = data.cartCreate.userErrors
      .map(err => `${err.field}: ${err.message}`)
      .join(', ')
    throw new Error(`Cart creation failed: ${errors}`)
  }

  return {
    id: data.cartCreate.cart.id,
    checkoutUrl: data.cartCreate.cart.checkoutUrl,
    webUrl: data.cartCreate.cart.checkoutUrl, // Alias for backward compatibility
  }
}

/**
 * Updates an existing cart with new line items (updated to use Cart API)
 *
 * @param {string} cartId - Cart ID
 * @param {Array} lineItems - Updated line items
 * @returns {Promise<object>} Updated cart object
 */
export async function updateCheckout(cartId, lineItems) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    cartId,
    lines: lineItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    })),
  }

  const data = await shopifyFetch(query, variables)

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(
      `Cart update failed: ${data.cartLinesUpdate.userErrors
        .map(err => err.message)
        .join(', ')}`
    )
  }

  return {
    id: data.cartLinesUpdate.cart.id,
    checkoutUrl: data.cartLinesUpdate.cart.checkoutUrl,
    webUrl: data.cartLinesUpdate.cart.checkoutUrl, // Alias for backward compatibility
  }
}

/**
 * Gets product by handle (slug)
 *
 * @param {string} handle - Product handle/slug
 * @returns {Promise<object>} Product data
 */
export async function getProductByHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { handle })
  return data.productByHandle
}

/**
 * Gets products from a collection
 *
 * @param {string} handle - Collection handle/slug
 * @param {number} first - Number of products to fetch (default: 50)
 * @returns {Promise<Array>} Array of products
 */
export async function getCollectionProducts(handle, first = 50) {
  const query = `
    query getCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { handle, first })

  if (!data.collectionByHandle) {
    return []
  }

  return data.collectionByHandle.products.edges.map(edge => edge.node)
}

/**
 * Checks product variant availability
 *
 * @param {string} variantId - Shopify variant ID
 * @returns {Promise<object>} Variant availability data
 */
export async function checkVariantAvailability(variantId) {
  const query = `
    query getVariant($id: ID!) {
      node(id: $id) {
        ... on ProductVariant {
          id
          title
          availableForSale
          quantityAvailable
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  `

  const data = await shopifyFetch(query, { id: variantId })
  return data.node
}

/**
 * Helper function to format cart items for Shopify checkout
 *
 * This function handles both old and new data structures:
 * - Old: sizes: [35, 36, 37]
 * - New: sizes: [{size: 35, shopifyVariantId: "gid://..."}]
 *
 * @param {Array} cartItems - Your cart items
 * @returns {Array} Formatted line items for Shopify
 */
export function formatCartItemsForCheckout(cartItems) {
  return cartItems.map(item => {
    // If the item already has shopifyVariantId (added at checkout time)
    if (item.shopifyVariantId) {
      return {
        variantId: item.shopifyVariantId,
        quantity: item.quantity,
      }
    }

    // Otherwise, throw an error - we need the variant ID
    throw new Error(
      `Missing shopifyVariantId for product "${item.name}" size ${item.size}. ` +
      `Please update your products.json with Shopify variant IDs. ` +
      `See SHOPIFY_MIGRATION_GUIDE.md for instructions.`
    )
  })
}

/**
 * Get Shopify checkout URL from cart items
 *
 * This is the main function you'll call from your "Finalizar Compra" button
 *
 * @param {Array} cartItems - Cart items with shopifyVariantId and quantity
 * @returns {Promise<string>} Checkout URL to redirect to
 *
 * @example
 * const checkoutUrl = await getCheckoutUrl(cartItems)
 * window.location.href = checkoutUrl // Redirect to Shopify checkout
 */
export async function getCheckoutUrl(cartItems) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty')
  }

  const lineItems = formatCartItemsForCheckout(cartItems)
  const checkout = await createCheckout(lineItems)

  return checkout.webUrl
}
