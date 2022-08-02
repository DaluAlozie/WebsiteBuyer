import { useState,useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'
import SignUpForm from '../components/sign-up-form';
import { useRouter } from 'next/router'
import getUser from '../components/unprotected'
import toast, { Toaster } from 'react-hot-toast';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const fields= {
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const buttonClass = "relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
const errorTextClass = "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"

export default function SignUp() {
    const [details,setDetails]=useState(fields);
    const [errorState, setErrorState] = useState();
    const {firstName, surname, email, password, confirmPassword} = details

    const router = useRouter()

    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})

    }

    async function handleSubmit(e) {
        e.target.disabled = true
        setErrorState("")
        if (!(firstName && surname && email && password && confirmPassword)) setErrorState("Please fill in all fields")
        else if (!(password == confirmPassword)) setErrorState("Passwords do not match")

        else{
            const { user, session, error } = await supabase.auth.signUp({
                email: email,
                password: password
              })
              if (user){
                try {
                    const { data, error } = await supabase
                    .from('Profile')
                    .insert({
                        firstName: capitalizeFirstLetter(firstName.toString()),
                        surname: capitalizeFirstLetter(surname.toString()),
                        user_id: user.id.toString()
                      },
                      {
                        returning: "minimal"
                      })

                    if (!error) {
                        toast.success("Confirmation link sent to email")
                        router.push("/sign-in")
                    }
                    else{
                        toast.error(error.message)
                    }
                } catch (error) {
                    toast.error("An error occured")
                }
              } 
              else setErrorState(error.message)
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

export async function getServerSideProps(req) {
    return getUser(req)
}
