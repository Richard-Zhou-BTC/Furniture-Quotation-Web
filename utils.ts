
/**
 * Optimizes an image URL using wsrv.nl proxy.
 * Resizes, compresses, and converts to WebP for faster loading.
 * 
 * @param url The original image URL
 * @param width The desired width in pixels
 * @returns The optimized image URL
 */
export const getOptimizedImageUrl = (url: string, width: number = 600): string => {
  if (!url) return '';
  // Encode the URL to ensure special characters don't break the query string
  const encodedUrl = encodeURIComponent(url);
  // w: width
  // q: quality (default 75 is usually a good balance)
  // output: webp (smaller file size than jpeg/png)
  return `https://wsrv.nl/?url=${encodedUrl}&w=${width}&q=75&output=webp`;
};
