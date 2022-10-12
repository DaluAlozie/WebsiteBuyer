import ProfileForm from '../components/Profile/update-profile-form';
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';


const fields= {
    firstName: "",
    surname: "",
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Profile( props ) {
    
    const [details,setDetails]=useState(fields)
    const [errorState, setErrorState] = useState("");
    const [provider, setProvider] = useState("");


    const {firstName, surname} = details

    useEffect(  () => {

        getUserProfile()        
    },[])

    async function handleEmail(user) {
        const { data, error} = await supabase
        .from('profiles')
        .select("provider")
        .ilike('email', user.email)
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



    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})
    }
    async function handleReset(e){
        e.target.disabled = true
        e.preventDefault()
        try {
            const user = supabase.auth.user()

            const response = await handleEmail(user).then((res) => res)
            if (!response) return false

            const { data, error } = await supabase.auth.api.resetPasswordForEmail(
                user.email,
                {
                  redirectTo: `${window.location.origin}/password-reset`,
                }
            )

            if (error) toast.error(error.message)
            else if (data) toast.success("A reset link has been sent to your email")

            
        } catch (error) {
            console.log(error);
            toast.error("An error occured :/")
        }        

        e.target.disabled = false

    }
    
    async function handleSubmit(e) {

        e.target.disabled = true

        if (!(firstName && surname)) setErrorState("Please fill in all fields")

        else{
            try {
                const user = supabase.auth.user()
                const { data, error } = await supabase
                    .from('profiles')
                    .upsert({
                        firstName: capitalizeFirstLetter(firstName.toString()),
                        surname: capitalizeFirstLetter(surname.toString()),
                        id: user.id
                    })

                    if (data && !error){
                        toast.success("Update Successful")
                    }
                    else if (data && !error){
                        toast.error("Update Unsuccessful")
                    }
            } catch (error) {
                toast.error("An error occured")
            }
            
        }
        e.target.disabled = false

    }
    async function getUserProfile(){
        try {
            setErrorState("")
            const user = supabase.auth.user()
            setProvider(user.identities[0].provider.toLowerCase())
    
            const { data: data, error} = await supabase
                .from('profiles')
                .select("firstName,surname")
                .eq('id', user.id)
                .single()
            
            if (data) setDetails(data)
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <ProfileForm 
            handleChange={ handleChange }
            handleReset={ handleReset }
            handleSubmit={ handleSubmit }
            details= { details }
            error={ errorState }
            provider={provider}
        />
    )
}

