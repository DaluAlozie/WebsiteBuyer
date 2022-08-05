import checkAuthUser from '../components/protected'
import ProfileForm from '../components/update-profile-form';
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';


const fields= {
    firstName: "",
    surname: "",
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Profile( {user,headers} ) {
    
    const [details,setDetails]=useState(fields)
    const [errorState, setErrorState] = useState("");

    const {firstName, surname} = details

    useEffect(  () => {
        getUserProfile()
    },[])


    function handleChange(e) {
        setDetails({...details,[e.target.id]:e.target.value})
    }
    async function handleReset(e){
        e.target.disabled = true
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.api.resetPasswordForEmail(
                user.email,
                {
                  redirectTo: `${headers.host}/password-reset`,
                }
            )

            if (error) toast.error(error.message)
            else if (data) toast.success("Reset link sent to email")

            
        } catch (error) {
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
                    .from('Profile')
                    .upsert({
                        firstName: capitalizeFirstLetter(firstName.toString()),
                        surname: capitalizeFirstLetter(surname.toString()),
                        user_id: user.id
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
        setErrorState("")
        const user = supabase.auth.user()

        const { data: data, error} = await supabase
            .from('Profile')
            .select("firstName,surname")
            .eq('user_id', user.id)
            .single()
        
        if (data) setDetails(data)
    }
      

    return (
        <ProfileForm 
            handleChange={ handleChange }
            handleReset={ handleReset }
            handleSubmit={ handleSubmit }
            details= { details }
            error={ errorState }
        />
    )
}

export async function getServerSideProps(req) {
    return checkAuthUser(req)
}


export default Profile