// Client-side only Cloudinary utilities with enhanced security
// No server-side dependencies required

import {
  getCloudName,
  obfuscateUrl,
  getCachedUrl,
  checkRateLimit,
  validateDomain,
} from "./security";

// Validate environment before generating URLs
const validateEnvironment = (): boolean => {
  return validateDomain() && checkRateLimit();
};

// Generate optimized video URL with transformations
export const generateVideoUrl = (
  publicId: string,
  options: {
    quality?: string;
    format?: string;
    width?: number;
    height?: number;
    crop?: string;
    useCache?: boolean;
    obfuscate?: boolean;
  } = {}
) => {
  if (!validateEnvironment()) {
    console.warn("Environment validation failed for video URL generation");
    return "";
  }

  const cloudName = getCloudName();
  const {
    quality = "auto",
    format = "auto",
    width,
    height,
    crop = "fill",
    useCache = true,
    obfuscate = false,
  } = options;

  const cacheKey = `video_${publicId}_${JSON.stringify(options)}`;

  if (useCache) {
    return getCachedUrl(cacheKey, () => {
      let transformations = `q_${quality},f_${format}`;

      if (width) {
        transformations += `,w_${width}`;
      }
      if (height) {
        transformations += `,h_${height}`;
      }
      if (width || height) {
        transformations += `,c_${crop}`;
      }

      const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}.mp4`;
      return obfuscate ? obfuscateUrl(baseUrl) : baseUrl;
    });
  }

  // Non-cached generation
  let transformations = `q_${quality},f_${format}`;

  if (width) {
    transformations += `,w_${width}`;
  }
  if (height) {
    transformations += `,h_${height}`;
  }
  if (width || height) {
    transformations += `,c_${crop}`;
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}.mp4`;
  return obfuscate ? obfuscateUrl(baseUrl) : baseUrl;
};

// Generate poster/thumbnail URL
export const generatePosterUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    startOffset?: string | number;
    useCache?: boolean;
    obfuscate?: boolean;
  } = {}
) => {
  if (!validateEnvironment()) {
    console.warn("Environment validation failed for poster URL generation");
    return "";
  }

  const cloudName = getCloudName();
  const {
    width = 600,
    height,
    quality = "auto",
    startOffset = "0",
    useCache = true,
    obfuscate = false,
  } = options;

  const cacheKey = `poster_${publicId}_${JSON.stringify(options)}`;

  if (useCache) {
    return getCachedUrl(cacheKey, () => {
      let transformations = `so_${startOffset},q_${quality},f_auto,w_${width}`;

      if (height) {
        transformations += `,h_${height},c_fill`;
      }

      const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}.jpg`;
      return obfuscate ? obfuscateUrl(baseUrl) : baseUrl;
    });
  }

  // Non-cached generation
  let transformations = `so_${startOffset},q_${quality},f_auto,w_${width}`;

  if (height) {
    transformations += `,h_${height},c_fill`;
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}.jpg`;
  return obfuscate ? obfuscateUrl(baseUrl) : baseUrl;
};

// Generate multiple quality versions for adaptive streaming
export const generateVideoUrls = (
  publicId: string,
  options: { useCache?: boolean; obfuscate?: boolean } = {}
) => {
  const cloudName = getCloudName();
  const { useCache = true, obfuscate = false } = options;

  return {
    high: generateVideoUrl(publicId, { quality: "80", useCache, obfuscate }),
    medium: generateVideoUrl(publicId, {
      quality: "60",
      width: 1280,
      useCache,
      obfuscate,
    }),
    low: generateVideoUrl(publicId, {
      quality: "40",
      width: 720,
      useCache,
      obfuscate,
    }),
    poster: generatePosterUrl(publicId, { useCache, obfuscate }),
  };
};

// Utility to handle YouTube vs Cloudinary URLs
export const getVideoSrc = (
  videoSrc: string,
  quality: "high" | "medium" | "low" = "high",
  options: { useCache?: boolean; obfuscate?: boolean } = {}
) => {
  // If it's a YouTube URL, return as-is
  if (videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be")) {
    return videoSrc;
  }

  // If it's already a full URL, return as-is
  if (videoSrc.startsWith("http")) {
    return videoSrc;
  }

  // Generate Cloudinary URL based on quality
  const urls = generateVideoUrls(videoSrc, options);
  return urls[quality];
};

// Get poster URL for any video source
export const getPosterSrc = (
  videoSrc: string,
  options: { useCache?: boolean; obfuscate?: boolean } = {}
) => {
  // For YouTube videos, we can't generate posters easily
  if (videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be")) {
    return undefined; // Let the video element handle it
  }

  // If it's already a full URL, extract public ID (complex, skip for now)
  if (videoSrc.startsWith("http")) {
    return undefined;
  }

  // Generate poster for Cloudinary public ID
  return generatePosterUrl(videoSrc, options);
};
