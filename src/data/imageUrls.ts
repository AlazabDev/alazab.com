/**
 * Image URLs Configuration
 * Centralized management of all image URLs from CDNs
 * Updated: 2025
 */

// AWS S3 Gallery - Hotel Collection Images
export const AWS_S3_GALLERY = {
  bucket: 'azgallery.s3.amazonaws.com',
  folder: 'hoting',
  baseUrl: 'https://azgallery.s3.amazonaws.com/hoting',
  images: [
    'coll-hote-001.png', 'coll-hote-002.png', 'coll-hote-003.png', 'coll-hote-004.png', 'coll-hote-005.png',
    'coll-hote-006.png', 'coll-hote-007.png', 'coll-hote-008.png', 'coll-hote-009.png', 'coll-hote-010.png',
    'coll-hote-011.png', 'coll-hote-012.png', 'coll-hote-013.jpg', 'coll-hote-014.png', 'coll-hote-015.png',
    'coll-hote-016.png', 'coll-hote-017.png', 'coll-hote-018.png', 'coll-hote-019.png', 'coll-hote-020.png',
    'coll-hote-021.png', 'coll-hote-022.png', 'coll-hote-023.png', 'coll-hote-024.jpg', 'coll-hote-025.png',
    'coll-hote-026.png', 'coll-hote-027.png', 'coll-hote-028.png', 'coll-hote-029.png', 'coll-hote-030.png',
    'coll-hote-031.png', 'coll-hote-032.png', 'coll-hote-033.png', 'coll-hote-034.png', 'coll-hote-035.png',
    'coll-hote-036.png', 'coll-hote-037.png', 'coll-hote-038.png', 'coll-hote-039.png', 'coll-hote-040.jpg',
  ],
};

// Cloudinary Gallery - High Quality Images
export const CLOUDINARY_GALLERY = {
  cloud: 'dxtrf2azn',
  baseUrl: 'https://res.cloudinary.com/dxtrf2azn/image/upload',
  categories: {
    showcase: [
      'v1774610956/azws-231_tbseh8.jpg', 'v1774610905/azws-230_vnstgj.jpg', 'v1774610858/azws-232_baxwar.jpg',
      'v1774610838/azws-227_rvemvv.jpg', 'v1774610836/azws-226_zecw4b.jpg', 'v1774610829/azws-229_qwigm1.jpg',
      'v1774610826/azws-228_xczgfy.jpg', 'v1774610825/azws-216_na0fna.jpg', 'v1774610819/azws-224_kltbel.jpg',
      'v1774610798/azws-225_e6zdp1.jpg', 'v1774610784/azws-223_vzm5cd.jpg', 'v1774610774/azws-221_wj7bpv.jpg',
      'v1774610771/azws-220_iwrhft.jpg', 'v1774610768/azws-222_eoouff.jpg', 'v1774610744/azws-218_x74dk9.jpg',
      'v1774610734/azws-212_gykpaf.jpg', 'v1774610731/azws-219_imczig.jpg', 'v1774610715/azws-213_hq6d4r.jpg',
      'v1774610714/azws-215_wmjbtu.jpg', 'v1774610708/azws-217_yh1ipi.jpg',
    ],
    projects: [
      'v1774610704/azws-214_z0dayy.jpg', 'v1774610659/azws-102_lwst7m.jpg', 'v1774581743/azws-104_upu7lh.jpg',
      'v1774581740/azws-103_ydjayr.jpg', 'v1774581684/azws-106_x4twy4.jpg', 'v1774581674/azws-105_y8trvh.jpg',
      'v1774581643/azws-102_pb1par.jpg', 'v1774581639/azws-101_qdmdsm.jpg',
    ],
    architectural: [
      'v1774581537/azw-317_yxucpd.jpg', 'v1774581536/azw-316_lvigx5.jpg', 'v1774581534/azw-315_j8lgqw.jpg',
      'v1774581533/azw-314_zejbdt.jpg', 'v1774581531/azw-313_qel44r.jpg', 'v1774581530/azw-312_kalaeh.jpg',
      'v1774581528/azw-311_mlpvqx.jpg', 'v1774581527/azw-310_u2dh1u.jpg', 'v1774581525/azw-309_gtqc6s.jpg',
      'v1774581524/azw-308_xqac02.jpg',
    ],
    interior_design: [
      'v1774581522/azw-307_u4div2.jpg', 'v1774581521/azw-306_n7t8lw.jpg', 'v1774581520/azw-305_urxerb.jpg',
      'v1774581518/azw-304_xlndf7.jpg', 'v1774581516/azw-303_wdqkfv.jpg', 'v1774581515/azw-302_k345x3.jpg',
      'v1774581514/azw-301_g0bq1x.jpg', 'v1774581512/azw-300_heawkp.jpg',
    ],
  },
};

// Helper Functions
export const getAWSImageUrl = (filename: string): string => {
  return `${AWS_S3_GALLERY.baseUrl}/${filename}`;
};

export const getCloudinaryImageUrl = (path: string, options?: { width?: number; height?: number; quality?: string }): string => {
  const baseUrl = CLOUDINARY_GALLERY.baseUrl;
  const transformations = [];

  if (options?.width || options?.height) {
    const width = options.width ? `w_${options.width}` : '';
    const height = options.height ? `h_${options.height}` : '';
    const q = options.quality || 'auto';
    transformations.push([width, height, `q_${q}`].filter(Boolean).join(','));
  } else {
    transformations.push('q_auto');
  }

  const transform = transformations.length > 0 ? `/${transformations.join('/')}` : '';
  return `${baseUrl}${transform}/${path}`;
};

// Get all images from a category
export const getCloudinaryImages = (category: keyof typeof CLOUDINARY_GALLERY.categories): string[] => {
  return CLOUDINARY_GALLERY.categories[category].map(path => getCloudinaryImageUrl(path));
};

// Get random image
export const getRandomCloudinaryImage = (category?: keyof typeof CLOUDINARY_GALLERY.categories): string => {
  const cat = category || 'showcase';
  const images = getCloudinaryImages(cat);
  return images[Math.floor(Math.random() * images.length)];
};

// Batch image URLs
export const batchCloudinaryImages = (paths: string[], options?: { width?: number; height?: number; quality?: string }): string[] => {
  return paths.map(path => getCloudinaryImageUrl(path, options));
};

// Image optimization presets
export const imagePresets = {
  thumbnail: { width: 300, height: 300, quality: 'auto' },
  card: { width: 500, height: 350, quality: 'auto' },
  hero: { width: 1200, height: 600, quality: 'auto' },
  gallery: { width: 800, height: 600, quality: 'auto' },
  full: { width: 1920, height: 1080, quality: 'auto' },
};

// Safe image URL getter with fallback
export const getSafeImageUrl = (
  url: string | undefined,
  fallback = 'https://via.placeholder.com/500x500?text=Image'
): string => {
  return url && url.trim().length > 0 ? url : fallback;
};
