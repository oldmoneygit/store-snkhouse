/**
 * Configuração - México 🇲🇽
 * snkhousemexico.com
 */

export default {
  code: 'MX',
  name: 'México',
  domains: ['snkhousemexico.com', 'www.snkhousemexico.com'],

  // Moeda
  currency: {
    code: 'MXN',
    symbol: '$',
    locale: 'es-MX',
    decimals: 2,
  },

  // Shopify
  shopify: {
    domain: process.env.NEXT_PUBLIC_MX_SHOPIFY_DOMAIN || 'snkhouse-mx.myshopify.com',
    storefrontToken: process.env.NEXT_PUBLIC_MX_SHOPIFY_TOKEN || '',
    apiVersion: '2024-10',
  },

  // Meta Pixel
  metaPixel: {
    id: process.env.NEXT_PUBLIC_MX_META_PIXEL_ID || '',
    conversionsToken: process.env.MX_META_CONVERSIONS_TOKEN || '',
  },

  // Webhook
  webhook: {
    secret: process.env.MX_SHOPIFY_WEBHOOK_SECRET || '',
  },

  // i18n - Tradução e linguagem
  i18n: {
    locale: 'es-MX',
    language: 'Español (México)',
    translations: {
      // Produto
      product: 'Tenis', // México usa "tenis" ao invés de "zapatillas"
      products: 'Tenis',
      addToCart: 'Agregar al carrito',
      buyNow: 'Comprar ahora',
      size: 'Talla', // México usa "talla" ao invés de "talle"
      sizes: 'Tallas',
      sizeGuide: 'Guía de tallas',
      outOfStock: 'Agotado',
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
      whatsappNumber: '+54 11 1234-5678', // Mesmo número (IA)
      email: 'contacto@snkhousemexico.com',

      // Informações
      freeShipping: 'Envío Gratis en compras superiores a $1,500 MXN',
      securePayment: 'Pago 100% Seguro',
      authenticity: 'Productos 100% Auténticos',

      // Messages
      addedToCart: '¡Agregado al carrito!',
      addedToWishlist: '¡Agregado a favoritos!',
      removedFromWishlist: 'Eliminado de favoritos',
      errorGeneric: 'Ocurrió un error. Por favor, intenta nuevamente.',
      selectSize: 'Por favor selecciona una talla',
      added: '¡Agregado!',
      backToStore: 'Volver a la tienda',
      soldOut: 'Agotado',

      // Product Features
      premiumQuality: 'Calidad Premium 1:1',
      premiumQualityDesc: 'Máxima calidad garantizada',
      fastShipping: 'Envío Rápido',
      fastShippingDesc: 'Recibes en 3-5 días hábiles',
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
      exclusiveSneakers: 'Tenis Exclusivos', // México usa "tenis" no "sneakers"
      exploreCollection: 'Explorar Colección',

      // Home Page - Feedbacks
      satisfiedCustomer: '+1 Cliente Satisfecho',
      moreThan: 'Más de',
      satisfiedCustomers: 'clientes satisfechos',
      and: 'y',
      ordersSent: 'pedidos enviados',
      toAllCountry: 'a todo México', // Mudança: México
      withPremiumQuality: 'con tenis de calidad premium!', // Mudança: tenis
      andMoreOnInstagram: '¡Y mucho más en nuestro Instagram!',
      thousandsOfRealFeedbacks: 'Miles de feedbacks reales, drops exclusivos y toda la acción del showroom',
      averageRating: 'Calificación promedio',
      ordersSentToCountry: 'Pedidos enviados a todo México', // Mudança: México
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
      countryName: 'México',
      freeShippingCountry: '¡Envío GRATIS a todo México!',
      deliveryDescription: 'Conoce los tiempos de entrega según tu ubicación',
      contactDescription: 'Ponte en contacto con nosotros',

      // Tracking Page
      orderTrackingTitle: 'Seguimiento de Pedido',
      trackYourOrder: 'Rastrea tu pedido en tiempo real ingresando tu número de orden',
      enterYourData: 'Ingresa tus datos',
      orderNumberLabel: 'Número de Pedido',
      searching: 'Buscando...',
      trackOrderButton: 'Rastrear Pedido',
      orderNumberTip: '💡 Tip: Encontrarás tu número de pedido en el email de confirmación que te enviamos al realizar la compra.',
      orderStatus: 'Estado del Pedido',
      order: 'Pedido',
      estimatedDelivery: 'Entrega estimada',
      currentLocation: 'Ubicación actual',
      trackingHistory: 'Historial de rastreo',
      enterOrderNumber: 'Ingresa tu número de pedido',
      completeFormToTrack: 'Completa el formulario para ver el estado de tu pedido',
      needHelp: '¿Necesitas ayuda?',
      needHelpDescription: 'Si tienes algún problema con tu pedido o el seguimiento, nuestro equipo está listo para ayudarte.',
      contactSupport: 'Contactar Soporte',
      viewFaqs: 'Ver Preguntas Frecuentes',

      // Delivery Page
      deliveryTimeTitle: 'Plazo de Entrega',
      knowDeliveryTimes: 'Conoce los tiempos de entrega según tu ubicación',
      businessDays: 'días hábiles',
      freeShippingBanner: 'Sin mínimo de compra • Sin costos ocultos • Rastreo incluido',
      deliveryTimesByRegion: 'Tiempos de entrega por región',
      howShippingWorks: '¿Cómo funciona el proceso de envío?',

      // Shipping Process Steps
      step: 'Paso',
      orderConfirmation: 'Confirmación de pedido',
      orderConfirmationDesc: 'Recibes un email confirmando tu compra con todos los detalles',
      immediate: 'Inmediato',
      orderPreparation: 'Preparación del pedido',
      orderPreparationDesc: 'Verificamos stock y empacamos tu producto con cuidado',
      hours24to48: '24-48 horas',
      dispatch: 'Despacho',
      dispatchDesc: 'Tu pedido sale de nuestro centro de distribución',
      days2to3: '2-3 días hábiles',
      inTransit: 'En tránsito',
      inTransitDesc: 'Puedes rastrear tu envío en tiempo real con el número de seguimiento',
      accordingToLocation: 'Según tu ubicación',
      delivered: '¡Entregado!',
      deliveredDesc: 'Recibes tu pedido en la puerta de tu casa',

      // Important Info Section
      importantDeliveryInfo: 'Información importante sobre entregas',
      businessDaysTitle: 'Días hábiles',
      businessDaysDesc: 'Los tiempos de entrega se cuentan en días hábiles (lunes a viernes), excluyendo fines de semana y feriados.',
      securePackaging: 'Empaque seguro',
      securePackagingDesc: 'Todos nuestros productos son embalados con materiales de calidad para garantizar que lleguen en perfecto estado.',
      correctAddress: 'Dirección correcta',
      correctAddressDesc: 'Asegúrate de proporcionar una dirección completa y correcta. Incluye referencias si es necesario.',
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
      questionsAboutShipping: '¿Tienes preguntas sobre tu envío?',
      supportAvailable: 'Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta sobre entregas.',
      trackMyOrder: 'Rastrear mi pedido',

      // FAQ Page
      frequentQuestions: 'Preguntas Frecuentes',
      findAnswers: 'Encuentra respuestas rápidas a las preguntas más comunes',
      searchQuestion: 'Buscar pregunta...',
      noResultsFound: 'No encontramos resultados',
      tryOtherTerms: 'Intenta con otros términos de búsqueda',
      viewAllQuestions: 'Ver todas las preguntas',
      didntFindWhatYouLookingFor: '¿No encontraste lo que buscabas?',
      supportTeamAvailable: 'Nuestro equipo de soporte está disponible para ayudarte. Contáctanos y te responderemos a la brevedad.',

      // Size Guide
      sizeGuideTitle: 'Guía de Tallas',  // México: tallas
      sizeGuideDescription: 'Encuentra tu talla perfecta con nuestra tabla de conversión internacional',
      sizeTableHeader: 'MX',
      howToMeasureFoot: 'Cómo medir tu pie',
      howToMeasureStep1: 'Coloca una hoja de papel en el suelo contra una pared',
      howToMeasureStep2: 'Párate sobre el papel con tu talón contra la pared',
      howToMeasureStep3: 'Marca la punta de tu dedo más largo',
      howToMeasureStep4: 'Mide desde el borde del papel hasta la marca en centímetros',
      howToMeasureStep5: 'Compara la medida con nuestra tabla de tallas',
      importantTips: 'Consejos importantes',
      tip1: 'Mide tus pies al final del día cuando están más hinchados',
      tip2: 'Usa los calcetines que normalmente usarías con tus tenis',
      tip3: 'Mide ambos pies y usa la medida del pie más grande',
      tip4: 'Si estás entre dos tallas, elige la talla más grande',
      tip5: 'Las tallas pueden variar ligeramente entre diferentes modelos',
      doubtAboutSize: '¿Tienes dudas sobre tu talla?',
      sizeHelpText: 'Nuestro equipo está aquí para ayudarte a encontrar la talla perfecta. Contáctanos por WhatsApp y te asesoramos personalmente.',
      contactByWhatsApp: 'Contactar por WhatsApp',

      // Contact
      contactUsTitle: 'Contáctanos',
      getInTouch: 'Ponte en contacto con nosotros',
      contactSubtitle: 'Estamos aquí para ayudarte. Elige el canal que prefieras para comunicarte con nosotros',
      fastestWayToContact: 'La forma más rápida de contactarnos',
      immediateResponse: 'Respuesta inmediata',
      forDetailedQuestions: 'Para consultas detalladas',
      responseIn24to48: 'Respuesta en 24-48 horas',
      followUsForOffers: 'Síguenos para ofertas exclusivas',
      dailyNews: 'Novedades diarias',
      serviceHours: 'Horarios de atención',
      mondayToFriday: 'Lunes a Viernes',
      saturdays: 'Sábados',
      sundays: 'Domingos',
      location: 'Ubicación',
      onlineStore: 'Tienda 100% online',
      shippingToCountry: 'Envíos a todo México',
      sendUsMessage: 'Envíanos un mensaje',
      messageSentSuccess: '¡Mensaje enviado con éxito! Te responderemos pronto.',
      fullName: 'Nombre completo',
      yourName: 'Tu nombre',
      phone: 'Teléfono',
      subject: 'Asunto',
      selectSubject: 'Selecciona un asunto',
      productQuery: 'Consulta sobre productos',
      orderStatus: 'Estado de mi pedido',
      returnOrExchange: 'Cambio o devolución',
      sizeQuery: 'Consulta de tallas',
      wholesale: 'Compra al por mayor',
      other: 'Otro',
      messageLabel: 'Mensaje',
      writeYourMessage: 'Escribe tu mensaje aquí...',
      sending: 'Enviando...',
      sendMessage: 'Enviar Mensaje',

      // Policies
      returnPolicyTitle: 'Política de Cambios y Devoluciones',
      returnPolicySubtitle: 'Tu satisfacción es nuestra prioridad. Conoce nuestras políticas de cambio y devolución',
      privacyPolicyTitle: 'Política de Seguridad y Privacidad',
      privacyPolicySubtitle: 'Tu privacidad y seguridad son fundamentales para nosotros. Conoce cómo protegemos tus datos',
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
          a: 'Trabajamos con un amplio rango de tallas desde US 6 hasta US 13 en hombres, y US 5 hasta US 12 en mujeres. Si no ves tu talla disponible, contáctanos y verificaremos stock.',
        },
      ],
    },
    {
      category: 'Envíos y Entregas',
      questions: [
        {
          q: '¿Hacen envíos a todo México?',
          a: 'Sí, realizamos envíos a todo el territorio mexicano sin costo adicional. El plazo de entrega varía según la ubicación: CDMX y área metropolitana (2-4 días), Estado de México (4-7 días), Interior (5-10 días).',
        },
        {
          q: '¿Cuánto tarda el envío?',
          a: 'Los tiempos de entrega son: CDMX y área metropolitana: 2-4 días hábiles, Estado de México: 4-7 días hábiles, Interior del país: 5-10 días hábiles.',
        },
        {
          q: '¿Puedo rastrear mi pedido?',
          a: 'Sí, una vez despachado tu pedido recibirás un número de seguimiento para que puedas rastrear tu envío en tiempo real.',
        },
        {
          q: '¿El envío tiene costo?',
          a: 'No, todos nuestros envíos son GRATIS a todo México. No hay costos ocultos ni cargos adicionales.',
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
          q: '¿Cómo hago un cambio de talla?',
          a: 'Contáctanos por WhatsApp o email con tu número de pedido. Coordinamos el retiro del producto y te enviamos la nueva talla sin costo adicional.',
        },
        {
          q: '¿Quién paga el envío de la devolución?',
          a: 'Si el cambio es por error de talla, nosotros nos hacemos cargo del envío. Si es por cambio de modelo o devolución, el costo del envío es compartido.',
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
          a: 'Si tu pedido aún no fue despachado, contáctanos inmediatamente por WhatsApp y lo modificaremos sin problema.',
        },
        {
          q: '¿Puedo cancelar mi pedido?',
          a: 'Sí, puedes cancelar tu pedido sin costo si aún no fue despachado. Una vez despachado, aplican las políticas de devolución.',
        },
      ],
    },
    {
      category: 'Otros',
      questions: [
        {
          q: '¿Tienen tienda física?',
          a: 'Actualmente operamos 100% online para ofrecerte los mejores precios. Realizamos entregas a domicilio en todo México.',
        },
        {
          q: '¿Hacen mayoreo o ventas al por mayor?',
          a: 'Sí, ofrecemos precios especiales para compras al por mayor. Contáctanos por WhatsApp para más información sobre precios y cantidades mínimas.',
        },
        {
          q: '¿Cómo puedo contactarlos?',
          a: 'Puedes contactarnos por WhatsApp, email (contacto@snkhouse.com), o a través de nuestras redes sociales. Respondemos todos los días de 9:00 a 21:00hs.',
        },
      ],
    },
  ],

  // Informações legais e políticas
  legal: {
    companyName: 'SNKHOUSE México',
    taxId: 'RFC: XXXXXXXXXXXX', // Atualizar
    address: 'Ciudad de México, México', // Atualizar
    country: 'México',
  },

  // Delivery regions
  delivery: {
    regions: [
      {
        region: 'CDMX y área metropolitana',
        icon: '🏙️',
        days: '2-4 días hábiles',
        color: 'from-green-500/20 to-green-500/0 border-green-500/30',
        iconColor: 'text-green-500',
      },
      {
        region: 'Estado de México',
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
    siteName: 'SNKHOUSE México',
    siteDescription: 'Sneakers exclusivos y auténticos en México. Jordan, Yeezy, Travis Scott y más.',
    defaultTitle: 'SNKHOUSE - Sneakers Exclusivos México',
    titleTemplate: '%s | SNKHOUSE México',
    keywords: 'sneakers mexico, tenis exclusivos, jordan mexico, yeezy mexico, travis scott',
  },
}
