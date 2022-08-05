import '../styles/globals.css'
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast';
import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/main';

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
    <div className='h-screen'>
      <Header
        signedInUser={signedInUser}
      >
  
      </Header>
      <Main>
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
      </Main>
      <Footer></Footer>
    </div>
    )}

export default MyApp
