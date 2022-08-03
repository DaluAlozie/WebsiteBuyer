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
        console.log("hh");
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
      <nav className='flex flex-wrap items-start p-3 bg-blue-800 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <svg
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 mr-2 text-white fill-current'
            >
              <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
            </svg>
          </a>
        </Link>
        <button onClick={()=>document.getElementById("navbar").classList.toggle("hidden")} 
          className='inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-blue-700 lg:hidden hover:text-white'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div id="navbar" className='justify-between hidden w-full font-mono lg:inline-flex lg:flex-grow lg:w-auto'>
          <div className='flex flex-col items-start w-1/2 lg:inline-flex lg:flex-row lg:w-auto lg:items-center lg:h-auto'>
            <Link href='/'>
              <a className={NavLinkLeft}>
                Home
              </a>
            </Link>
            
            { signedInUser && (
              <>
              <Link href='/profile'>
                <a className={NavLinkLeft}>
                  Profile
                </a>
              </Link>
              <Link href='/buy-a-website'>
                <a className={NavLinkLeft}>
                  Design Website
                </a>
              </Link>
              </>
            )}

          </div>

          {/*Right Side */}
          <div className='flex flex-col items-end w-1/2 lg:inline-flex lg:flex-row lg:w-auto lg:items-center lg:h-auto'>
          { signedInUser && (
              <>
              <Link href='/sign-out'>
                <a className={NavLinkLeft}>
                  Logout
                </a>
              </Link>
              </>
            )}
            { !signedInUser && (
              <>
              <Link href='/sign-in'>
                <a className={NavLinkLeft}>
                  Login
                </a>
              </Link>
              <Link href='/sign-up'>
                <a className={NavLinkLeft}>
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
