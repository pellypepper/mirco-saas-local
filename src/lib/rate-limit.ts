import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Different rate limiters for different use cases
export const rateLimiters = {
  // Strict rate limit for authentication endpoints
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 requests per 15 minutes
    analytics: true,
    prefix: "@upstash/ratelimit/auth",
  }),

  // Moderate rate limit for API endpoints
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"), // 20 requests per minute
    analytics: true,
    prefix: "@upstash/ratelimit/api",
  }),

  // Lenient rate limit for general requests
  general: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 requests per minute
    analytics: true,
    prefix: "@upstash/ratelimit/general",
  }),

  // Very strict for password reset
  passwordReset: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests per hour
    analytics: true,
    prefix: "@upstash/ratelimit/password-reset",
  }),

  // OAuth attempts
  oauth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 attempts per 15 minutes
    analytics: true,
    prefix: "@upstash/ratelimit/oauth",
  }),
};

// Helper function to get client IP
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return "unknown";
}

// Helper function to check rate limit
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const { success, limit, remaining, reset } = await limiter.limit(identifier);
  
  return {
    success,
    limit,
    remaining,
    reset,
  };
}