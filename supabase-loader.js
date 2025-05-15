/**
 * Generates a URL for loading images from Supabase storage with specified transformations.
 *
 * @see https://supabase.com/docs/guides/storage/serving/image-transformations?queryGroups=language&language=js#nextjs-loader
 *
 * @param {import('next/dist/shared/lib/image-external').ImageLoaderProps} props - The parameters of the image to load.
 * @param {string} props.src - The original image URL path in Supabase storage.
 * @param {number} props.width - The desired width of the transformed image.
 * @param {number} [props.quality=75] - The desired quality of the transformed image (0-100).
 * @returns {string} The URL of the transformed image.
 */
const AllowedHost = ['avatars.githubusercontent.com']
/** @type {import('next/dist/shared/lib/image-external').ImageLoader} */
export default function supabaseLoader({ src, width, quality = 75 }) {
  // If it's a local image (starts with an underscore or is an object URL)
  if (
    isExisting(src) ||
    src.startsWith('/_next/') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src
  }

  // Continue with Supabase loading for remote images
  const hostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  const pathname = `/storage/v1/render/image/public/${src}`
  const url = new URL(pathname, hostname)
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', quality.toString())
  return url.href
}
function isExisting(src) {
  return AllowedHost.filter((value) => {
    return value.includes(src)
  })
}
