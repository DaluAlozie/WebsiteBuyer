import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { TextClass } from '../constants/styling';
import checkAuthUser from '../components/protected';

export default function SignOut() {
    
    const router = useRouter()

    useEffect( () => {
        signOut()
        window.localStorage.clear();
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

export async function getServerSideProps(req) {
    return checkAuthUser(req)
}

