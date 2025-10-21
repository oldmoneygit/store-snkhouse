'use client'

import { useEffect } from 'react'

export function useMetaPixel() {
  // Track ViewContent event
  const trackViewContent = (contentName, contentIds = [], value = 0, currency = 'ARS') => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_ids: contentIds,
        content_type: 'product',
        value: value,
        currency: currency,
      })

      console.log('Meta Pixel - ViewContent tracked:', {
        content_name: contentName,
        content_ids: contentIds,
        value,
        currency,
      })
    }
  }

  // Track AddToCart event
  const trackAddToCart = (contentName, contentId, value = 0, currency = 'ARS') => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: contentName,
        content_ids: [contentId],
        content_type: 'product',
        value: value,
        currency: currency,
      })

      console.log('Meta Pixel - AddToCart tracked:', {
        content_name: contentName,
        content_id: contentId,
        value,
        currency,
      })
    }
  }

  // Track InitiateCheckout event
  const trackInitiateCheckout = (value = 0, currency = 'ARS', numItems = 0) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: value,
        currency: currency,
        num_items: numItems,
      })

      console.log('Meta Pixel - InitiateCheckout tracked:', {
        value,
        currency,
        num_items: numItems,
      })
    }
  }

  // Track Purchase event
  const trackPurchase = (value, currency = 'ARS', contentIds = []) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: value,
        currency: currency,
        content_ids: contentIds,
        content_type: 'product',
      })

      console.log('Meta Pixel - Purchase tracked:', {
        value,
        currency,
        content_ids: contentIds,
      })
    }
  }

  // Track Search event
  const trackSearch = (searchString) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchString,
      })

      console.log('Meta Pixel - Search tracked:', searchString)
    }
  }

  return {
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackSearch,
  }
}
