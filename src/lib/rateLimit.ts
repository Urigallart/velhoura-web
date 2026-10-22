/**
 * A small in-process rate limiter, per key (usually the client IP). Same
 * trade-off as the contact route's: one Map, no vendor; on a cold serverless
 * instance it starts empty, which is the same as no limiter for that instant.
 */
export function createRateLimiter(perWindow: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function limited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= perWindow) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 500) {
      for (const [k, stamps] of hits) if (stamps.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return false;
  };
}

/** Behind Vercel the first entry of x-forwarded-for is the client. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
