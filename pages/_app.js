import '../styles/globals.css'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import {NavLinkRight, NavLinkLeft } from "../constants/styling";
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const [ signedInUser, setSignedInUser ] = useState(false)

  const router = useRouter()
  

  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`)
      }
    }

    router.events.on('routeChangeError', handleRouteChangeError)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])
  

  useEffect( () => {
    getUserProfile()

    const { data: authListner } = supabase.auth.onAuthStateChange((event, session) => {
      
      handleAuthChange(event, session)

      if (event == 'SIGNED_IN') {
        setSignedInUser(true)
        getUserProfile()
        router.push("/")

      }
      else if (event == 'SIGNED_OUT') {
        setSignedInUser(false)
        getUserProfile()
        router.push("/sign-in")
      }
    })

    return () => { authListner.unsubscribe() }

  },[router])

  async function getUserProfile(){

    const user = supabase.auth.user()
    setSignedInUser( (user)? true: false)

    if (user) {
      let { data: Profile, error } = await supabase
        .from('Profile')
        .select("firstName,surname")
        .eq('user_id', user.id)
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    })
  }
  return ( 
    <div className='bg-blue"'>
      <nav className="flex flex-wrap items-center justify-between p-6 pr-12 text-xl bg-blue-700 border-b border-blue-700 rounded-md">
        <div className="block lg:hidden">
          <button onClick={()=>document.getElementById("navbar").classList.toggle("hidden")} className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div id='navbar' className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"> 
            <Link href="/">
              <a className={NavLinkLeft} href="">Home</a>
            </Link>

            { signedInUser && (
            <>
              <Link href="/profile">
                <a href="" className={NavLinkLeft}>
                  Profile
                </a>
              </Link>
              <Link href="/buy-a-website">
                <a href="" className={NavLinkLeft}>
                  Buy Website
                </a>
              </Link>
            </>
            )}
            
          </div>
          <div className='text-sm'>
          { signedInUser && (
            <>
              <Link href="/sign-out">
                <a href="" className={NavLinkRight}>
                  Logout
                </a>
              </Link>
            </>
            )}
          { !signedInUser && (
            <>
              <Link href="/sign-in">
                <a href="" className={NavLinkRight}>
                  Login
                </a>
              </Link>
              <Link href="/sign-up">
                <a href="" className={NavLinkRight}>
                  Sign Up
                </a>
              </Link>
            </>
            )}
          </div>
        </div>
      </nav>

      <Toaster
        toastOptions={{
          duration: 3700,

          success: {
            style: {
              background: '#8bfa69',
            },
          },
          error: {
            style: {
              background: '#fc6f6f',
            },
          },
        }}
      />
      <div>

      </div>
      <div className="px-16 py-8">
        <Component {...pageProps} />
      </div>
    </div>
    )}

export default MyApp
