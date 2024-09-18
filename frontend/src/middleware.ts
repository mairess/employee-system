import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard-employees', '/dashboard-users'],
};
