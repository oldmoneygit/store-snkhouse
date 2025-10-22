/**
 * Configuração - Argentina 🇦🇷
 * snkhouseargentina.com
 */

export default {
  code: 'AR',
  name: 'Argentina',
  domains: ['snkhouseargentina.com', 'www.snkhouseargentina.com'],

  // Moeda
  currency: {
    code: 'ARS',
    symbol: '$',
    locale: 'es-AR',
    decimals: 2,
  },

  // Shopify
  shopify: {
    domain: process.env.NEXT_PUBLIC_AR_SHOPIFY_DOMAIN || '9wurf1-73.myshopify.com',
    storefrontToken: process.env.NEXT_PUBLIC_AR_SHOPIFY_TOKEN || '7b53ccc78ba348565e335d6cb129f610',
    apiVersion: '2024-10',
  },

  // Meta Pixel
  metaPixel: {
    id: process.env.NEXT_PUBLIC_AR_META_PIXEL_ID || '1503220410800125',
    conversionsToken: process.env.AR_META_CONVERSIONS_TOKEN || 'EAAROK9divmABP5fu1EfmxAZBpanynzTDm1eOwNW8QzWtym2zrcCV5e32IbHU728h4y',
  },

  // Webhook
  webhook: {
    secret: process.env.AR_SHOPIFY_WEBHOOK_SECRET || '383771b77aa992cee86c81f5a8182650621b8e2229eccba92b3485c1520fe844',
  },

  // i18n - Tradução e linguagem
  i18n: {
    locale: 'es-AR',
    language: 'Español (Argentina)',
    translations: {
      // Produto
      product: 'Zapatillas', // Argentina usa "zapatillas"
      products: 'Zapatillas',
      addToCart: 'Agregar al carrito',
      buyNow: 'Comprar ahora',
      size: 'Talle',
      sizes: 'Talles',
      sizeGuide: 'Guía de talles',
      outOfStock: 'Sin stock',
      inStock: 'Disponible',

      // Carrinho
      cart: 'Carrito',
      myCart: 'Mi Carrito',
      emptyCart: 'Tu carrito está vacío',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Finalizar compra',
      continueShopping: 'Seguir comprando',

      // Navegação
      home: 'Inicio',
      collection: 'Colección',
      collections: 'Colecciones',
      search: 'Buscar',
      favorites: 'Favoritos',
      account: 'Cuenta',

      // Filtros
      filter: 'Filtrar',
      sortBy: 'Ordenar por',
      priceAsc: 'Precio: Menor a Mayor',
      priceDesc: 'Precio: Mayor a Menor',
      newest: 'Más Nuevos',

      // Footer
      aboutUs: 'Sobre Nosotros',
      contact: 'Contacto',
      faqs: 'Preguntas Frecuentes',
      shipping: 'Envíos',
      returns: 'Cambios y Devoluciones',
      privacy: 'Política de Privacidad',
      terms: 'Términos y Condiciones',

      // Contato
      whatsapp: 'WhatsApp',
      whatsappNumber: '+54 11 1234-5678', // Atualizar com número real
      email: 'contacto@snkhouseargentina.com',

      // Informações
      freeShipping: 'Envío Gratis en compras superiores a $100.000',
      securePayment: 'Pago 100% Seguro',
      authenticity: 'Productos 100% Auténticos',

      // Messages
      addedToCart: '¡Agregado al carrito!',
      addedToWishlist: '¡Agregado a favoritos!',
      removedFromWishlist: 'Eliminado de favoritos',
      errorGeneric: 'Ocurrió un error. Por favor, intentá nuevamente.',
      selectSize: 'Por favor seleccioná un talle',
      added: '¡Agregado!',
      backToStore: 'Volver a la tienda',
      soldOut: 'Agotado',

      // Product Features
      premiumQuality: 'Calidad Premium 1:1',
      premiumQualityDesc: 'Máxima calidad garantizada',
      fastShipping: 'Envío Rápido',
      fastShippingDesc: 'Recibís en 3-5 días hábiles',
      securePurchase: 'Compra Segura',
      securePurchaseDesc: 'Protección al comprador',

      // Forms
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar',

      // Tracking
      orderTracking: 'Seguimiento de Pedido',
      trackOrder: 'Rastrear Pedido',
      orderNumber: 'Número de Pedido',

      // Home Page - Hero
      exclusiveSneakers: 'Sneakers Exclusivos',
      exploreCollection: 'Explorar Colección',

      // Home Page - Feedbacks
      satisfiedCustomer: '+1 Cliente Satisfecho',
      moreThan: 'Más de',
      satisfiedCustomers: 'clientes satisfechos',
      and: 'y',
      ordersSent: 'pedidos enviados',
      toAllCountry: 'a toda Argentina',
      withPremiumQuality: 'con sneakers de calidad premium!',
      andMoreOnInstagram: '¡Y mucho más en nuestro Instagram!',
      thousandsOfRealFeedbacks: 'Miles de feedbacks reales, drops exclusivos y toda la acción del showroom',
      averageRating: 'Calificación promedio',
      ordersSentToCountry: 'Pedidos enviados a toda Argentina',
      recommendationRate: 'Tasa de recomendación',

      // Home Page - Gallery
      ourStore: 'Nuestra Tienda',
      experiencePremium: 'Experiencia Premium',

      // Collection Page
      productsInCollection: 'productos en',
      noProductsFound: 'No se encontraron productos',
      noProductsInCollection: 'No hay productos disponibles en esta colección.',
      backToHome: 'Volver al Inicio',

      // General
      previous: 'Anterior',
      next: 'Siguiente',
      loading: 'Cargando',
      viewMore: 'Ver Más',
      viewAll: 'Ver Todo',
      featured: 'Destacados',
      newArrivals: 'Nuevos Ingresos',
      bestSellers: 'Más Vendidos',

      // Institutional Pages - Country Specific
      countryName: 'Argentina',
      freeShippingCountry: '¡Envío GRATIS a toda Argentina!',
      deliveryDescription: 'Conocé los tiempos de entrega según tu ubicación',
      contactDescription: 'Ponete en contacto con nosotros',

      // Tracking Page
      orderTrackingTitle: 'Seguimiento de Pedido',
      trackYourOrder: 'Rastreá tu pedido en tiempo real ingresando tu número de orden',
      enterYourData: 'Ingresá tus datos',
      orderNumberLabel: 'Número de Pedido',
      searching: 'Buscando...',
      trackOrderButton: 'Rastrear Pedido',
      orderNumberTip: '💡 Tip: Encontrás tu número de pedido en el email de confirmación que te enviamos al realizar la compra.',
      orderStatus: 'Estado del Pedido',
      order: 'Pedido',
      estimatedDelivery: 'Entrega estimada',
      currentLocation: 'Ubicación actual',
      trackingHistory: 'Historial de rastreo',
      enterOrderNumber: 'Ingresá tu número de pedido',
      completeFormToTrack: 'Completá el formulario para ver el estado de tu pedido',
      needHelp: '¿Necesitás ayuda?',
      needHelpDescription: 'Si tenés algún problema con tu pedido o el seguimiento, nuestro equipo está listo para ayudarte.',
      contactSupport: 'Contactar Soporte',
      viewFaqs: 'Ver Preguntas Frecuentes',

      // Delivery Page
      deliveryTimeTitle: 'Plazo de Entrega',
      knowDeliveryTimes: 'Conocé los tiempos de entrega según tu ubicación',
      businessDays: 'días hábiles',
      freeShippingBanner: 'Sin mínimo de compra • Sin costos ocultos • Rastreo incluido',
      deliveryTimesByRegion: 'Tiempos de entrega por región',
      howShippingWorks: '¿Cómo funciona el proceso de envío?',

      // Shipping Process Steps
      step: 'Paso',
      orderConfirmation: 'Confirmación de pedido',
      orderConfirmationDesc: 'Recibís un email confirmando tu compra con todos los detalles',
      immediate: 'Inmediato',
      orderPreparation: 'Preparación del pedido',
      orderPreparationDesc: 'Verificamos stock y empacamos tu producto con cuidado',
      hours24to48: '24-48 horas',
      dispatch: 'Despacho',
      dispatchDesc: 'Tu pedido sale de nuestro centro de distribución',
      days2to3: '2-3 días hábiles',
      inTransit: 'En tránsito',
      inTransitDesc: 'Podés rastrear tu envío en tiempo real con el número de seguimiento',
      accordingToLocation: 'Según tu ubicación',
      delivered: '¡Entregado!',
      deliveredDesc: 'Recibís tu pedido en la puerta de tu casa',

      // Important Info Section
      importantDeliveryInfo: 'Información importante sobre entregas',
      businessDaysTitle: 'Días hábiles',
      businessDaysDesc: 'Los tiempos de entrega se cuentan en días hábiles (lunes a viernes), excluyendo fines de semana y feriados.',
      securePackaging: 'Empaque seguro',
      securePackagingDesc: 'Todos nuestros productos son embalados con materiales de calidad para garantizar que lleguen en perfecto estado.',
      correctAddress: 'Dirección correcta',
      correctAddressDesc: 'Asegurate de proporcionar una dirección completa y correcta. Incluí referencias si es necesario.',
      trackingIncluded: 'Rastreo incluido',
      trackingIncludedDesc: 'Todos los envíos incluyen número de seguimiento para que puedas rastrear tu pedido en tiempo real.',

      // Delays Section
      whatIfDelays: '¿Qué pasa si hay demoras?',
      delaysIntro: 'Aunque trabajamos con las mejores empresas de logística, ocasionalmente pueden ocurrir demoras por:',
      weatherConditions: 'Condiciones climáticas adversas',
      holidays: 'Feriados nacionales o locales',
      highDemand: 'Alta demanda en temporada de ventas',
      addressProblems: 'Problemas con la dirección de entrega',
      delaysContact: 'Si tu pedido se demora más de lo esperado,',
      contactUsImmediately: 'contáctanos inmediatamente',
      andWeWillSolve: 'y lo solucionaremos.',

      // CTA Section
      questionsAboutShipping: '¿Tenés preguntas sobre tu envío?',
      supportAvailable: 'Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta sobre entregas.',
      trackMyOrder: 'Rastrear mi pedido',

      // FAQ Page
      frequentQuestions: 'Preguntas Frecuentes',
      findAnswers: 'Encontrá respuestas rápidas a las preguntas más comunes',
      searchQuestion: 'Buscar pregunta...',
      noResultsFound: 'No encontramos resultados',
      tryOtherTerms: 'Intentá con otros términos de búsqueda',
      viewAllQuestions: 'Ver todas las preguntas',
      didntFindWhatYouLookingFor: '¿No encontraste lo que buscabas?',
      supportTeamAvailable: 'Nuestro equipo de soporte está disponible para ayudarte. Contactanos y te responderemos a la brevedad.',

      // Size Guide
      sizeGuideTitle: 'Guía de Talles',
      sizeGuideDescription: 'Encontrá tu talle perfecto con nuestra tabla de conversión internacional',
      sizeTableHeader: 'ARG',
      howToMeasureFoot: 'Cómo medir tu pie',
      howToMeasureStep1: 'Colocá una hoja de papel en el suelo contra una pared',
      howToMeasureStep2: 'Párate sobre el papel con tu talón contra la pared',
      howToMeasureStep3: 'Marcá la punta de tu dedo más largo',
      howToMeasureStep4: 'Medí desde el borde del papel hasta la marca en centímetros',
      howToMeasureStep5: 'Compará la medida con nuestra tabla de talles',
      importantTips: 'Consejos importantes',
      tip1: 'Medí tus pies al final del día cuando están más hinchados',
      tip2: 'Usá los calcetines que normalmente usarías con tus sneakers',
      tip3: 'Medí ambos pies y usá la medida del pie más grande',
      tip4: 'Si estás entre dos talles, elegí el talle más grande',
      tip5: 'Los talles pueden variar ligeramente entre diferentes modelos',
      doubtAboutSize: '¿Tenés dudas sobre tu talle?',
      sizeHelpText: 'Nuestro equipo está aquí para ayudarte a encontrar el talle perfecto. Contactanos por WhatsApp y te asesoramos personalmente.',
      contactByWhatsApp: 'Contactar por WhatsApp',

      // Contact
      contactUsTitle: 'Contáctanos',
      getInTouch: 'Ponete en contacto con nosotros',
      contactSubtitle: 'Estamos aquí para ayudarte. Elegí el canal que prefieras para comunicarte con nosotros',
      fastestWayToContact: 'La forma más rápida de contactarnos',
      immediateResponse: 'Respuesta inmediata',
      forDetailedQuestions: 'Para consultas detalladas',
      responseIn24to48: 'Respuesta en 24-48 horas',
      followUsForOffers: 'Seguinos para ofertas exclusivas',
      dailyNews: 'Novedades diarias',
      serviceHours: 'Horarios de atención',
      mondayToFriday: 'Lunes a Viernes',
      saturdays: 'Sábados',
      sundays: 'Domingos',
      location: 'Ubicación',
      onlineStore: 'Tienda 100% online',
      shippingToCountry: 'Envíos a toda Argentina',
      sendUsMessage: 'Envianos un mensaje',
      messageSentSuccess: '¡Mensaje enviado con éxito! Te responderemos pronto.',
      fullName: 'Nombre completo',
      yourName: 'Tu nombre',
      phone: 'Teléfono',
      subject: 'Asunto',
      selectSubject: 'Seleccioná un asunto',
      productQuery: 'Consulta sobre productos',
      orderStatus: 'Estado de mi pedido',
      returnOrExchange: 'Cambio o devolución',
      sizeQuery: 'Consulta de talles',
      wholesale: 'Compra al por mayor',
      other: 'Otro',
      messageLabel: 'Mensaje',
      writeYourMessage: 'Escribí tu mensaje aquí...',
      sending: 'Enviando...',
      sendMessage: 'Enviar Mensaje',

      // Policies
      returnPolicyTitle: 'Política de Cambios y Devoluciones',
      returnPolicySubtitle: 'Tu satisfacción es nuestra prioridad. Conocé nuestras políticas de cambio y devolución',
      privacyPolicyTitle: 'Política de Seguridad y Privacidad',
      privacyPolicySubtitle: 'Tu privacidad y seguridad son fundamentales para nosotros. Conocé cómo protegemos tus datos',
    },
  },

  // FAQs - Preguntas y Respuestas
  faqs: [
    {
      category: 'Productos',
      questions: [
        {
          q: '¿Los productos son originales?',
          a: 'Nuestros productos son réplicas AAA+ de calidad 1:1, fabricadas con los mismos materiales y técnicas que las versiones originales. Ofrecemos la mejor calidad del mercado a precios accesibles.',
        },
        {
          q: '¿Qué significa calidad AAA+ o 1:1?',
          a: 'AAA+ o 1:1 significa que son réplicas de máxima calidad, idénticas a los originales en apariencia, materiales y construcción. Son prácticamente indistinguibles de las versiones retail.',
        },
        {
          q: '¿Tienen garantía los productos?',
          a: 'Sí, todos nuestros productos cuentan con garantía contra defectos de fabricación. Si tu producto llega con algún defecto, lo cambiamos sin costo adicional.',
        },
        {
          q: '¿Tienen todas las tallas disponibles?',
          a: 'Trabajamos con un amplio rango de talles desde US 6 hasta US 13 en hombres, y US 5 hasta US 12 en mujeres. Si no ves tu talle disponible, contactanos y verificaremos stock.',
        },
      ],
    },
    {
      category: 'Envíos y Entregas',
      questions: [
        {
          q: '¿Hacen envíos a toda Argentina?',
          a: 'Sí, realizamos envíos a todo el territorio argentino sin costo adicional. El plazo de entrega varía según la ubicación: CABA y GBA (2-4 días), Provincia de Buenos Aires (4-7 días), Interior (5-10 días).',
        },
        {
          q: '¿Cuánto tarda el envío?',
          a: 'Los tiempos de entrega son: CABA y GBA: 2-4 días hábiles, Provincia de Buenos Aires: 4-7 días hábiles, Interior del país: 5-10 días hábiles.',
        },
        {
          q: '¿Puedo rastrear mi pedido?',
          a: 'Sí, una vez despachado tu pedido recibirás un número de seguimiento para que puedas rastrear tu envío en tiempo real.',
        },
        {
          q: '¿El envío tiene costo?',
          a: 'No, todos nuestros envíos son GRATIS a toda Argentina. No hay costos ocultos ni cargos adicionales.',
        },
      ],
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), Mercado Pago, transferencia bancaria y efectivo (en algunos puntos de entrega).',
        },
        {
          q: '¿Puedo pagar en cuotas?',
          a: 'Sí, aceptamos pagos en cuotas a través de Mercado Pago y tarjetas de crédito. La cantidad de cuotas depende de tu banco.',
        },
        {
          q: '¿Es seguro comprar en SNKHOUSE?',
          a: 'Completamente seguro. Utilizamos encriptación SSL y procesadores de pago certificados. Tus datos están protegidos en todo momento.',
        },
      ],
    },
    {
      category: 'Cambios y Devoluciones',
      questions: [
        {
          q: '¿Puedo cambiar o devolver mi pedido?',
          a: 'Sí, aceptamos cambios y devoluciones dentro de los 15 días de recibido el producto. El artículo debe estar sin uso, con etiquetas originales y en su caja.',
        },
        {
          q: '¿Cómo hago un cambio de talle?',
          a: 'Contactanos por WhatsApp o email con tu número de pedido. Coordinamos el retiro del producto y te enviamos el nuevo talle sin costo adicional.',
        },
        {
          q: '¿Quién paga el envío de la devolución?',
          a: 'Si el cambio es por error de talle, nosotros nos hacemos cargo del envío. Si es por cambio de modelo o devolución, el costo del envío es compartido.',
        },
        {
          q: '¿Cuándo recibo mi reembolso?',
          a: 'Una vez que recibamos y verifiquemos el producto devuelto, procesamos el reembolso en 5-7 días hábiles al mismo método de pago original.',
        },
      ],
    },
    {
      category: 'Cuenta y Pedidos',
      questions: [
        {
          q: '¿Necesito crear una cuenta para comprar?',
          a: 'No es obligatorio, pero te recomendamos crear una cuenta para rastrear tus pedidos fácilmente y recibir ofertas exclusivas.',
        },
        {
          q: '¿Cómo puedo modificar mi pedido?',
          a: 'Si tu pedido aún no fue despachado, contactanos inmediatamente por WhatsApp y lo modificaremos sin problema.',
        },
        {
          q: '¿Puedo cancelar mi pedido?',
          a: 'Sí, podés cancelar tu pedido sin costo si aún no fue despachado. Una vez despachado, aplican las políticas de devolución.',
        },
      ],
    },
    {
      category: 'Otros',
      questions: [
        {
          q: '¿Tienen tienda física?',
          a: 'Actualmente operamos 100% online para ofrecerte los mejores precios. Realizamos entregas a domicilio en toda Argentina.',
        },
        {
          q: '¿Hacen mayoreo o ventas al por mayor?',
          a: 'Sí, ofrecemos precios especiales para compras al por mayor. Contactanos por WhatsApp para más información sobre precios y cantidades mínimas.',
        },
        {
          q: '¿Cómo puedo contactarlos?',
          a: 'Podés contactarnos por WhatsApp, email (contacto@snkhouse.com), o a través de nuestras redes sociales. Respondemos todos los días de 9:00 a 21:00hs.',
        },
      ],
    },
  ],

  // Informações legais e políticas
  legal: {
    companyName: 'SNKHOUSE Argentina',
    taxId: 'CUIT: XX-XXXXXXXX-X', // Atualizar
    address: 'Buenos Aires, Argentina', // Atualizar
    country: 'Argentina',
  },

  // Delivery regions
  delivery: {
    regions: [
      {
        region: 'CABA y GBA',
        icon: '🏙️',
        days: '2-4 días hábiles',
        color: 'from-green-500/20 to-green-500/0 border-green-500/30',
        iconColor: 'text-green-500',
      },
      {
        region: 'Provincia de Buenos Aires',
        icon: '🌆',
        days: '4-7 días hábiles',
        color: 'from-blue-500/20 to-blue-500/0 border-blue-500/30',
        iconColor: 'text-blue-500',
      },
      {
        region: 'Interior del país',
        icon: '🗺️',
        days: '5-10 días hábiles',
        color: 'from-orange-500/20 to-orange-500/0 border-orange-500/30',
        iconColor: 'text-orange-500',
      },
    ],
  },

  // Features específicas
  features: {
    multiCurrency: false,
    guestCheckout: true,
    wishlist: true,
    reviews: false,
    socialLogin: false,
  },

  // SEO
  seo: {
    siteName: 'SNKHOUSE Argentina',
    siteDescription: 'Sneakers exclusivos y auténticos en Argentina. Jordan, Yeezy, Travis Scott y más.',
    defaultTitle: 'SNKHOUSE - Sneakers Exclusivos Argentina',
    titleTemplate: '%s | SNKHOUSE Argentina',
    keywords: 'sneakers argentina, zapatillas exclusivas, jordan argentina, yeezy argentina, travis scott',
  },
}
