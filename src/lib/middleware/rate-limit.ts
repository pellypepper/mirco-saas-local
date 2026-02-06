import { NextRequest, NextResponse } from "next/server";
import { rateLimiters, getClientIp, checkRateLimit } from "@/lib/rate-limit";
import { Ratelimit } from "@upstash/ratelimit";

export async function withRateLimit(
  request: NextRequest,
  limiterType: keyof typeof rateLimiters = "general"
) {
  const ip = getClientIp(request);
  const limiter = rateLimiters[limiterType];

  const { success, limit, remaining, reset } = await checkRateLimit(ip, limiter);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
        message: "You have exceeded the rate limit. Please try again later.",
        limit,
        remaining: 0,
        reset: new Date(reset).toISOString(),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // Add rate limit headers to successful responses
  return {
    headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    },
  };
}