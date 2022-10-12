import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import SignUpForm from '../components/SignUp/sign-up-form';
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const fields= {
    email: "",
    password: "",
    confirmPassword: ""
}

export default function SignUp() {
    const [details,setDetails]=useState(fields);
    const [errorState, setErrorState] = useState();
    const {email, password, confirmPassword} = details

    const router = useRouter()

    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})

    }

    async function handleEmail() {
        const { data, error} = await supabase
        .from('profiles')
        .select("provider")
        .ilike('email', email)
        .single()

        const provider = data?.provider

        if (provider) {
            toast.error("Email already exists")
            return false
        }
        
        return true
    }

    async function handleSubmit(e) {
        
        const response = await handleEmail().then((res) => res)
        if (!response) return false

        e.target.disabled = true
        setErrorState("")
        if (!(email && password && confirmPassword)) setErrorState("Please fill in all fields")
        else if (!(password == confirmPassword)) setErrorState("Passwords do not match")

        else{
            const { user, session, error } = await supabase.auth.signUp({
                email: email,
                password: password
            })

            if (user)toast.success("A verify email link has been sent")
            else toast.error("An error has occured :/")
        }
        e.target.disabled = false
    }

    return(
        <SignUpForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit} 
            error={errorState}
            password={password}
        />
    )   
}
