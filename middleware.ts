import { authMiddleware } from "@civic/auth/nextjs/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Wrap authMiddleware to ensure COEP headers are properly set
export default function middleware(req: NextRequest) {
  const authResponse = authMiddleware()(req)
  
  // Create a new response or clone the existing one
  let response: NextResponse
  
  if (authResponse instanceof NextResponse) {
    response = authResponse
  } else if (authResponse instanceof Response) {
    response = NextResponse.next()
  } else {
    response = NextResponse.next()
  }
  
  // Override COEP headers to allow third-party resources
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin')
  
  return response
}

export const config = {
  // Apply to all routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}