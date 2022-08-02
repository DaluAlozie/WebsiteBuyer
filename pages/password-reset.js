import Link from "next/link"
import { useState, useEffect } from 'react'
import ResetForm from "../components/password-reset-form"
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast';

const TextClass = "text-sm font-bold text-gray-300 font-mono"

const fields= {
    password: "",
    confirmPassword: "",
}

export default function PasswordReset( context ){
    const [accessToken,setAccessToken]=useState("")
    const [type,setType]=useState("")
    const [details,setDetails]=useState(fields)
    const [errorState, setErrorState] = useState("");
    const {password, confirmPassword} = details

    const router = useRouter()

    
    useEffect( () => {
        
        const queryString = router.asPath;
        const urlParams = new URLSearchParams(queryString);

        const tempAccessToken = urlParams.get('/password-reset#access_token')
        const tempType = urlParams.get('type')
        
        setAccessToken(tempAccessToken)
        setType(tempType)

    },[router])
    
    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        e.target.disabled = true
        if ( !(password == confirmPassword) ) setErrorState("Passwords do not match")
        
        else if (type && type.toLowerCase() == "recovery"){
            const { error, data } = await supabase.auth.api
                .updateUser(accessToken, { password : password })
            
            if (error) toast.error("Something went wrong")
            else if (data){
                toast.success("Password changed successfully")
                router.push("/")
            } 
            else{
                toast.error("Something went wrong")
            }
        }
        else{
                toast.error("Something went wrong")
            }
        

        e.target.disabled = false
    }

    return (
        <>
         <ResetForm
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
        error={ errorState }
        password={ password }
     />  
        </>
     
    )
}