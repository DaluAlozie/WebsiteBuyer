import { NextResponse } from 'next/server'
import  { Nextreq } from 'next/server'
import { supabase } from './utils/supabaseClient'
// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const token = req.cookies.get('sb-access-token');
  if (token){
    const user = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    }).then((res) => res.json()); 

    //Authenticated users can only navigate to these pages 
    if (user){
      if (req.nextUrl.pathname.startsWith('/profile') || 
          req.nextUrl.pathname.startsWith('/buy-a-website') ||
          req.nextUrl.pathname.startsWith('/contact') ||
          req.nextUrl.pathname.startsWith('/checkout') 
          ){
            return NextResponse.next()  
      }
    }
  }
  else if (req.nextUrl.pathname.startsWith('/sign-in') ||
      req.nextUrl.pathname.startsWith('/sign-up') ||
      req.nextUrl.pathname.startsWith('/forgot-password')
      ){
        return NextResponse.next()
      }
  return NextResponse.redirect(new URL('/', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:  ['/sign-in', '/sign-up', '/buy-a-website','/contact','/profile','/forgot-password'],
}