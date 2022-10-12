import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import ForgotForm from '../components/ForgotPassword/forgot-password-form';
import toast from 'react-hot-toast';

export default function ForgotPaasword({headers}) {
    const [email,setEmail]=useState("");

    const router = useRouter()


    async function handleSubmit(e) {

        const response = await handleEmail().then((res) => res)
        if (!response) return false
        
        e.target.disabled = true

        const { data, error } = await supabase.auth.api.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/password-reset`,
            }
        )
        if (error) toast.error(error.message)
        else {
            toast.success("user") 
            router.push("/sign-in")
        }

        e.target.disabled = false

    }

    async function handleEmail() {
        const { data, error} = await supabase
        .from('profiles')
        .select("provider")
        .ilike('email', email)
        .single()

        const provider = data?.provider

        if (!provider) toast.error("Email does not exists")
        else if (!(provider == "email")){
            toast.error("Cannot reset password for third party login")
        }
        else{
            return true
        }

        return false
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
