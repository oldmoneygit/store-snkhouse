// Brand Colors
export const COLORS = {
  yellow: '#FAB800',
  black: '#0A0A0A',
  gray: '#AEAEAE',
}

// Images - REDESIGN 2.0 - ALL NEW UNIFIED SHOWROOM IMAGES! 🔥
export const IMAGES = {
  // HERO SECTION - Aerial view at blue hour (MOST ICONIC!)
  hero: '/images/hero-aerial-blue-hour.jpg',

  // INTERIOR VIEWS
  interiorBuenosAires: '/images/interior-buenos-aires-view.jpg',  // Interior with BA cityscape
  interiorWidePanoramic: '/images/interior-wide-panoramic.jpg',   // Full showroom panoramic
  interiorSymmetric: '/images/interior-symmetric-fisheye.jpg',    // Fisheye symmetric view

  // ENTRANCE/STOREFRONT
  entranceOutside: '/images/entrance-outside-view.jpg',           // Looking into store from outside
  entrancePOV: '/images/entrance-pov-feet.jpg',                   // POV from inside with feet

  // PRODUCTS - Real showroom product shots
  productJordan1Mocha: '/images/product-jordan1-mocha.jpg',       // Hand holding Jordan 1 Mocha
  productJordan1BlackToe: '/images/product-jordan1-blacktoe.jpg', // Jordan 1 on yellow pedestal
  productJordan1Low: '/images/product-jordan1-low.jpg',           // Existing (keep)

  // BRANDING
  logoSmoke: '/images/logo-smoke-circle.jpg',                     // SNKHOUSE logo with smoke

  // LEGACY (Old images - keeping for backwards compatibility)
  urbanArt: '/images/gallery-1.jpg',
  logo: '/images/hero-aerial-blue-hour.jpg',
  travisScott: '/images/product-jordan1-mocha.jpg',  // Redirecting to new
  jordan1: '/images/product-jordan1-blacktoe.jpg',   // Redirecting to new
  interiorFull: '/images/interior-wide-panoramic.jpg',
  shelves: '/images/interior-symmetric-fisheye.jpg',
  symmetry: '/images/interior-buenos-aires-view.jpg',
  lateralLighting: '/images/entrance-outside-view.jpg',
  facade: '/images/hero-aerial-blue-hour.jpg',       // Now using aerial view
  jordan4: '/images/product-jordan1-low.jpg',
}

// Stats Data
export const STATS_DATA = [
  {
    icon: 'Ruler',
    value: "180",
    label: "M² de Espacio",
    color: "text-brand-yellow"
  },
  {
    icon: 'Package',
    value: "500+",
    label: "Modelos",
    color: "text-purple-400"
  },
  {
    icon: 'Users',
    value: "50K+",
    label: "Sneakerheads",
    color: "text-blue-400"
  },
  {
    icon: 'Trophy',
    value: "#1",
    label: "En Argentina",
    color: "text-brand-yellow"
  }
]

// Features Data
export const FEATURES_DATA = [
  {
    icon: 'Store',
    title: "Experiencia Premium",
    desc: "Diseño exclusivo para explorar cada modelo",
    color: "from-brand-yellow/20 to-yellow-500/5"
  },
  {
    icon: 'Sparkles',
    title: "Drops Exclusivos",
    desc: "Acceso prioritario a lanzamientos limitados",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: 'TrendingUp',
    title: "Importados 1:1",
    desc: "Fabricados en las mismas fábricas que Nike",
    color: "from-blue-500/20 to-blue-500/5"
  }
]

// Timeline Data
export const TIMELINE_DATA = [
  {
    phase: "Demolición",
    status: "completed",
    icon: "Hammer",
    month: "Oct 2025"
  },
  {
    phase: "Estructura",
    status: "completed",
    icon: "Ruler",
    month: "Nov 2025"
  },
  {
    phase: "Diseño Interior",
    status: "inProgress",
    icon: "Palette",
    month: "Dic 2025"
  },
  {
    phase: "Branding",
    status: "upcoming",
    icon: "Sparkles",
    month: "Ene 2026"
  },
  {
    phase: "Montaje Final",
    status: "upcoming",
    icon: "Package",
    month: "Feb 2026"
  }
]

// Products Data - REAL SHOWROOM SHOTS! 🔥
export const PRODUCTS_DATA = [
  {
    img: IMAGES.productJordan1Mocha,
    title: "Air Jordan 1 High",
    desc: "Travis Scott Colors - Mocha Premium"
  },
  {
    img: IMAGES.productJordan1BlackToe,
    title: "Air Jordan 1 Retro High",
    desc: "Black Toe - Display Premium SNKHOUSE"
  }
]

// Construction Phases (CardStack) - REDUZIDO - só essenciais!
export const CONSTRUCTION_PHASES = [
  {
    id: 1,
    src: IMAGES.interiorBuenosAires,
    alt: "Interior con Vista de Buenos Aires",
    title: "VISTA BA",
    description: "Interior premium con skyline de Buenos Aires"
  },
  {
    id: 2,
    src: IMAGES.interiorSymmetric,
    alt: "Showroom Simetría Perfecta",
    title: "SIMETRÍA",
    description: "Display central con colección completa"
  },
  {
    id: 3,
    src: IMAGES.entranceOutside,
    alt: "Entrada SNKHOUSE Blue Hour",
    title: "ENTRADA",
    description: "Bienvenido a SNKHOUSE Palermo"
  }
]

// Location Data
export const LOCATION_DATA = {
  address: "Godoy Cruz 2539",
  neighborhood: "Palermo",
  city: "Buenos Aires",
  state: "CABA",
  country: "Argentina",
  fullAddress: "Godoy Cruz 2539, Palermo, CABA, Argentina"
}

// Social Links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/snkhouse.ar",
  instagramHandle: "@SNKHOUSE.AR"
}

// Opening Date
export const OPENING_DATE = new Date('2026-02-01T00:00:00')

// SEO Data
export const SEO_DATA = {
  title: "SNKHOUSE - Sneakers Exclusivos",
  description: "Sneakers premium importados 1:1. Nike, Jordan, Yeezy y más. Envío gratis a toda Argentina. Calidad garantizada.",
  keywords: "sneakers, zapatillas, showroom, Buenos Aires, Palermo, Nike, Jordan, streetwear, Argentina, SNKHOUSE",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://showroom-snkhouse.vercel.app",
  ogImage: IMAGES.hero
}
