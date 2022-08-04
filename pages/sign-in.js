import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import LoginForm from '../components/sign-in-form';
import { useRouter } from 'next/router'
import checkAnonUser from '../components/unprotected'

const fields= {
    email: "hi",
    password: "",
}
const buttonClass = "relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
const errorTextClass = "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"

export default function SignIn() {
    const [details,setDetails]=useState(fields);
    const [errorState, setErrorState] = useState("");
    const {email, password} = details

    const router = useRouter()

    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})
    }

    async function handleSubmit(e) {
        e.target.disabled = true

        setErrorState("")
        if (!(email && password)) setErrorState("Please fill in all fields")

        else{
            const { user, session, error } = await supabase.auth.signIn({
        
                email: email,
                password: password
              })
              if (user) ""
              else setErrorState(error.message)
        }
        e.target.disabled = false
    }

    return(
        <LoginForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit} 
            error={errorState}
        />
    )   
}

export async function getServerSideProps(req) {
    return checkAnonUser(req)
}