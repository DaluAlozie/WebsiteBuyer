import '../styles/globals.css'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { TextClass, NavLink } from "../constants/styling";
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
  }, [])
  

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

  },[])

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
      <nav className="flex justify-start p-6 pr-12 text-xl bg-blue-700 border-b border-blue-700 rounded-md">
        <Link href="/">
          <span className={NavLink}>Home</span>
        </Link>
      { signedInUser && (
          <>
            <Link href="/profile">
              <span className={NavLink}>Profile</span>
            </Link>
            <Link href="/buy-a-website">
              <span className={NavLink}>Buy a Website</span>
            </Link>
            <Link href="/sign-out">
              <span className="ml-auto font-mono text-xl text-gray-300 cursor-pointer"	>Logout</span>
            </Link>
          </>
          )
        }
        { !signedInUser && (
          <div className='flex justify-between ml-auto text-xl text-bold'>
            <Link href="/sign-in">
              <span className="ml-12 font-mono text-xl text-gray-300 cursor-pointer text-bold ">Login</span>
            </Link>
       
            <Link href="/sign-up">
              <span className="ml-12 font-mono text-xl text-gray-300 cursor-pointer text-bold ">Sign Up</span>
            </Link>
            
          </div>
          )
        }
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
