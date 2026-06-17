/**
 * Image URLs Configuration
 * Centralized management of all image URLs from remote CDNs and static data fallbacks.
 * This file is safe to import from Vite/React browser code.
 */

export type CloudinaryCategory = keyof typeof CLOUDINARY_GALLERY.categories;

export interface StaticGalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  alt_text?: string;
  created_at: string;
}

const FALLBACK_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#f3f4f6"/>
  <text x="400" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#111827">Alazab Group</text>
  <text x="400" y="335" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6b7280">Image preview unavailable</text>
</svg>
`);

export const DEFAULT_IMAGE_FALLBACK = `data:image/svg+xml;charset=UTF-8,${FALLBACK_SVG}`;

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
} as const;

export const imagePresets = {
  thumbnail: { width: 300, height: 300, quality: 'auto' },
  card: { width: 500, height: 350, quality: 'auto' },
  hero: { width: 1200, height: 600, quality: 'auto' },
  gallery: { width: 800, height: 600, quality: 'auto' },
  full: { width: 1920, height: 1080, quality: 'auto' },
} as const;

export type ImagePresetName = keyof typeof imagePresets;
export type ImageTransformOptions = { width?: number; height?: number; quality?: string };

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '');
const isAbsoluteUrl = (value: string) => /^(https?:)?\/\//i.test(value);
const isSpecialUrl = (value: string) => /^(data:|blob:|mailto:|tel:)/i.test(value);

export const normalizePublicPath = (path: string): string => {
  const cleanPath = path.trim();
  if (!cleanPath) return DEFAULT_IMAGE_FALLBACK;
  if (isAbsoluteUrl(cleanPath) || isSpecialUrl(cleanPath)) return cleanPath;

  const base = typeof import.meta !== 'undefined' ? import.meta.env.BASE_URL || '/' : '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${trimSlashes(cleanPath)}`;
};

export const getAWSImageUrl = (filename: string): string => {
  const cleanFilename = trimSlashes(filename.trim());
  if (!cleanFilename) return DEFAULT_IMAGE_FALLBACK;
  if (isAbsoluteUrl(cleanFilename) || isSpecialUrl(cleanFilename)) return cleanFilename;
  return `${AWS_S3_GALLERY.baseUrl}/${cleanFilename}`;
};

const stripCloudinaryBase = (urlOrPath: string): string => {
  const cleanValue = urlOrPath.trim();
  if (!cleanValue) return '';

  if (!cleanValue.includes('cloudinary.com')) {
    return trimSlashes(cleanValue);
  }

  const marker = '/image/upload/';
  const markerIndex = cleanValue.indexOf(marker);
  if (markerIndex === -1) return trimSlashes(cleanValue);

  const afterUpload = cleanValue.slice(markerIndex + marker.length);
  const parts = afterUpload.split('/').filter(Boolean);

  // Remove common transformation segments, but preserve version segment v123... and public id.
  while (parts.length > 0) {
    const segment = parts[0];
    if (/^v\d+$/.test(segment)) break;
    if (segment.includes(',') || /^[a-z]_[^/]+$/.test(segment) || segment === 'f_auto' || segment === 'q_auto') {
      parts.shift();
      continue;
    }
    break;
  }

  return parts.join('/');
};

const buildCloudinaryTransform = (options?: ImageTransformOptions): string => {
  const transformations = ['f_auto'];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  transformations.push(`q_${options?.quality || 'auto'}`);

  return transformations.filter(Boolean).join(',');
};

export const getCloudinaryImageUrl = (urlOrPath: string, options?: ImageTransformOptions): string => {
  const cleanValue = urlOrPath.trim();
  if (!cleanValue) return DEFAULT_IMAGE_FALLBACK;
  if (isSpecialUrl(cleanValue)) return cleanValue;

  // Non-Cloudinary absolute URLs should remain untouched.
  if (isAbsoluteUrl(cleanValue) && !cleanValue.includes('cloudinary.com')) {
    return cleanValue;
  }

  const publicPath = stripCloudinaryBase(cleanValue);
  if (!publicPath) return DEFAULT_IMAGE_FALLBACK;

  return `${CLOUDINARY_GALLERY.baseUrl}/${buildCloudinaryTransform(options)}/${publicPath}`;
};

export const getCloudinaryImages = (
  category: CloudinaryCategory,
  options?: ImageTransformOptions
): string[] => {
  return CLOUDINARY_GALLERY.categories[category].map(path => getCloudinaryImageUrl(path, options));
};

export const getAllCloudinaryImages = (options?: ImageTransformOptions): string[] => {
  return (Object.keys(CLOUDINARY_GALLERY.categories) as CloudinaryCategory[])
    .flatMap(category => getCloudinaryImages(category, options));
};

export const getRandomCloudinaryImage = (category?: CloudinaryCategory): string => {
  const cat = category || 'showcase';
  const images = getCloudinaryImages(cat);
  return images[Math.floor(Math.random() * images.length)] || DEFAULT_IMAGE_FALLBACK;
};

export const batchCloudinaryImages = (paths: string[], options?: ImageTransformOptions): string[] => {
  return paths.map(path => getCloudinaryImageUrl(path, options));
};

export const getSafeImageUrl = (
  url: string | undefined,
  fallback = DEFAULT_IMAGE_FALLBACK
): string => {
  if (!url || url.trim().length === 0) return fallback;
  const cleanUrl = url.trim();

  if (cleanUrl.includes('cloudinary.com')) return getCloudinaryImageUrl(cleanUrl);
  if (isAbsoluteUrl(cleanUrl) || isSpecialUrl(cleanUrl)) return cleanUrl;
  if (cleanUrl.startsWith('/')) return normalizePublicPath(cleanUrl);

  return cleanUrl;
};

export const getStaticGalleryImages = (category?: string): StaticGalleryImage[] => {
  const categories = Object.keys(CLOUDINARY_GALLERY.categories) as CloudinaryCategory[];
  const selectedCategories = category && categories.includes(category as CloudinaryCategory)
    ? [category as CloudinaryCategory]
    : categories;

  return selectedCategories.flatMap((cat) =>
    CLOUDINARY_GALLERY.categories[cat].map((path, index) => ({
      id: `${cat}-${index + 1}`,
      title: `Alazab ${cat.replace(/_/g, ' ')} ${index + 1}`,
      url: getCloudinaryImageUrl(path, imagePresets.gallery),
      category: cat,
      description: 'صورة من معرض أعمال مجموعة العزب',
      alt_text: `صورة من معرض ${cat.replace(/_/g, ' ')}`,
      created_at: '2026-01-01T00:00:00.000Z',
    }))
  );
};
