import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { TextClass } from '../constants/styling';

export default function SignOut({req}) {

    useEffect( () => {
        signOut()
      },[])
    
    async function signOut() {
     
        await supabase.auth.signOut()
    }

    return(
        <div className={TextClass}>
            <h1>Logging Out.....</h1>
        </div>
    )
}


export  async function getServerSideProps({req}) {
    // Fetch data from external API

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: "/sign-in" } }
    }

    try {
        await supabase.auth.api.deleteAuthCookie(req)
    } catch (error) {
        
    }

    // Pass data to the page via props
    return { props: { user } }
}

