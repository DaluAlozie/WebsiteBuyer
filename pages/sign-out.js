import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { TextClass } from '../constants/styling';
import checkAuthUser from '../components/protected';
import { destroyCookie } from 'nookies';

export default function SignOut(res) {
    
    const router = useRouter()

    useEffect( () => {
        signOut()
      },[])
    
    async function signOut() {
        try {
            await supabase.auth.signOut()

        } catch (error) {}
    }

    return(
        <div className={TextClass}>
            <h1>Logging Out.....</h1>
        </div>
    )
}

export async function getServerSideProps({req,res}) {
    // Fetch data from external API

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: "/sign-in" } }
    }

    destroyCookie(res,"sb:token")

    // Pass data to the page via props
    return { props: { user } }
}
