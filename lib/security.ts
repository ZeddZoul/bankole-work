// Security utilities for client-side portfolio
// Provides basic obfuscation without requiring a backend

// Simple base64 decoding for cloud name obfuscation
const decode = (str: string): string => {
  if (typeof window === "undefined") return str;
  try {
    return atob(str);
  } catch {
    return str; // Return original if decoding fails
  }
};

// Cloud name with basic obfuscation
const ENCODED_CLOUD_NAME = "ZHo3bnZ0eTU3"; // Base64 encoded cloud name

// Get cloud name with fallback
export const getCloudName = (): string => {
  // Try environment variable first
  const envCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (envCloudName) {
    return envCloudName;
  }

  // Fallback to decoded value
  return decode(ENCODED_CLOUD_NAME);
};

// Add simple URL obfuscation by adding random parameters
export const obfuscateUrl = (url: string): string => {
  const urlObj = new URL(url);

  // Add some random parameters to make URL less predictable
  urlObj.searchParams.set("_t", Date.now().toString(36));
  urlObj.searchParams.set("_r", Math.random().toString(36).substring(2, 8));

  return urlObj.toString();
};

// Create a session-based cache for URLs to reduce repeated generation
const urlCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export const getCachedUrl = (key: string, generator: () => string): string => {
  const cached = urlCache.get(key);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }

  const newUrl = generator();
  urlCache.set(key, { url: newUrl, timestamp: now });

  return newUrl;
};

// Rate limiting for client-side URL generation
const rateLimiter = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 1000 * 60; // 1 minute
const MAX_REQUESTS = 100; // Max requests per minute

export const checkRateLimit = (identifier: string = "default"): boolean => {
  const now = Date.now();
  const requests = rateLimiter.get(identifier) || [];

  // Remove old requests outside the window
  const validRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (validRequests.length >= MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  validRequests.push(now);
  rateLimiter.set(identifier, validRequests);

  return true;
};

// Domain validation for additional security
const ALLOWED_DOMAINS = [
  "localhost",
  "127.0.0.1",
  "vercel.app",
  "netlify.app",
  "github.io",
  // Add your custom domain here
];

export const validateDomain = (): boolean => {
  if (typeof window === "undefined") return true; // Allow server-side

  const hostname = window.location.hostname;

  // Allow localhost and development
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return true;
  }

  // Check against allowed domains
  return ALLOWED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
};

// Generate a simple fingerprint for analytics
export const getSessionFingerprint = (): string => {
  if (typeof window === "undefined") return "server";

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width.toString(),
    screen.height.toString(),
    new Date().getTimezoneOffset().toString(),
  ];

  return btoa(components.join("|")).substring(0, 12);
};
