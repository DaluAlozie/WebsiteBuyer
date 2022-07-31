import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { TextClass } from '../constants/styling';
import getUser from '../components/unprotected'
import ForgotForm from '../components/forgot-password-form';

export default function ForgotPaasword() {
    
    const router = useRouter()

    

    return(
        <ForgotForm/>
    )
}

export async function getServerSideProps(req) {
    return getUser(req)
}
