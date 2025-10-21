/**
 * Configuration for next-image-export-optimizer
 * Optimizes images during static export build
 */

module.exports = {
  // Image quality (0-100)
  quality: 85,

  // Image formats to generate
  formats: ['webp', 'jpg'],

  // Image sizes to generate (responsive)
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

  // Storage folder for optimized images
  storePicturesInWEBP: true,

  // Generate JSON manifest of images
  generateAndUseBlurImages: true,

  // Source folder
  sourceFolder: 'public',

  // Export folder (relative to out directory)
  exportFolder: 'nextImageExportOptimizer',
}
