import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import checkAnonUser from '../components/unprotected'
import ForgotForm from '../components/forgot-password-form';
import toast from 'react-hot-toast';

export default function ForgotPaasword({headers}) {
    const [email,setEmail]=useState("");

    const router = useRouter()

    async function handleSubmit(e) {
        console.log(`${headers.host}/sign-in`);

        const { data, error } = await supabase.auth.api.resetPasswordForEmail(
            email,
            {
                redirectTo: `${headers.host}/password-reset`,
            }
        )
        if (error) toast.error(error.message)
        else {
            toast.success("Reset link sent to email") 
            router.push("/sign-in")
        }
    }

    async function handleChange(e) {
        setEmail(e.target.value)
    }

    return(
        <ForgotForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        />
    )
}

export async function getServerSideProps(req) {
    return checkAnonUser(req)
}
