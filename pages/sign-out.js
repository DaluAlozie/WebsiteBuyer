import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { TextClass } from '../constants/styling';
import checkAuthUser from '../components/protected';
import Button from '../components/button';
export default function SignOut() {

    
    async function signOut() {
        try {
            await supabase.auth.signOut()

        } catch (error) {}
    }
    signOut()
    
    return(
        <div className={TextClass}>
            <h1>Logging Out.....</h1>
            <Button>

            </Button>
        </div>
    )
}

export async function getServerSideProps(req) {
    return checkAuthUser(req)
}

