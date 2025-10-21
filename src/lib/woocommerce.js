import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

/**
 * Busca produto por nome exato ou slug
 */
export async function getProductByName(name) {
  try {
    const response = await api.get("products", {
      search: name,
      per_page: 1
    });

    return response.data[0] || null;
  } catch (error) {
    console.error(`Erro ao buscar produto "${name}":`, error.message);
    return null;
  }
}

/**
 * Busca múltiplos produtos por nome
 */
export async function getProductsByNames(names) {
  try {
    const products = await Promise.all(
      names.map(name => getProductByName(name))
    );

    return products.filter(Boolean);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
}

/**
 * Busca produtos por categoria
 */
export async function getProductsByCategory(categorySlug) {
  try {
    // Primeiro busca a categoria
    const categoriesResponse = await api.get("products/categories", {
      slug: categorySlug
    });

    if (!categoriesResponse.data.length) {
      return [];
    }

    const categoryId = categoriesResponse.data[0].id;

    // Depois busca produtos da categoria
    const productsResponse = await api.get("products", {
      category: categoryId,
      per_page: 100
    });

    return productsResponse.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria "${categorySlug}":`, error.message);
    return [];
  }
}

/**
 * Busca todos os produtos
 */
export async function getAllProducts() {
  try {
    const response = await api.get("products", {
      per_page: 100
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error.message);
    return [];
  }
}

/**
 * Formata preço para Real Argentino (ARS)
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Extrai dados necessários do produto WooCommerce
 */
export function extractProductData(wcProduct) {
  if (!wcProduct) return null;

  return {
    id: wcProduct.id,
    name: wcProduct.name,
    slug: wcProduct.slug,
    price: parseFloat(wcProduct.price) || 0,
    regularPrice: parseFloat(wcProduct.regular_price) || 0,
    salePrice: wcProduct.sale_price ? parseFloat(wcProduct.sale_price) : null,
    currency: 'ARS',
    image: wcProduct.images[0]?.src || '',
    permalink: wcProduct.permalink,
    stock: wcProduct.stock_status === 'instock' ? 'available' :
           wcProduct.stock_status === 'outofstock' ? 'soldout' : 'limited',
    categories: wcProduct.categories.map(cat => cat.name),
    tags: wcProduct.tags.map(tag => tag.name)
  };
}
