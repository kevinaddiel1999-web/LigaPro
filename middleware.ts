import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Buscar token de sesión de Supabase en las cookies
  const token = req.cookies.get('sb-access-token')?.value || 
                req.cookies.get('supabase-auth-token')?.value;

  const { pathname } = req.nextUrl;

  // Proteger la ruta /dashboard y sus subrutas
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};