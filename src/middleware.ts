import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rateLimitRedis';

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limitCheck = await rateLimit(ip);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limitCheck.retryAfter || 60) } }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
