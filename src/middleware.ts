import { type NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  
  if (pathname.startsWith('/login') || pathname == '/') {
    if (cookies().get('is_logged')?.value == '1') {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  } else {
    if (cookies().get('is_logged')?.value != '1') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
