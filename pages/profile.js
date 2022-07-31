import getUser from '../components/protected'
import ProfileForm from '../components/update-profile-form';
import { supabase } from '../utils/supabaseClient'
import { useState, useEffect } from 'react'
import Link from 'next/link'


const fields= {
    firstName: "",
    surname: "",
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Profile( {user} ) {
    
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
                  redirectTo: `${window.location.origin}/password-reset`,
                }
            )

            if (error) console.log(error)
            else if (data) ""

            
        } catch (error) {
            console.log(error)
        }        

        e.target.disabled = false

    }
    
    async function handleSubmit(e) {

        e.target.disabled = true

        if (!(firstName && surname)) setErrorState("Please fill in all fields")

        else{
            const user = supabase.auth.user()
            const { data, error } = await supabase
                .from('Profile')
                .update({firstName: capitalizeFirstLetter(firstName.toString()),
                        surname: capitalizeFirstLetter(surname.toString()) 
                })
                .eq("user_id", user.id)
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
        else setErrorState(error)
    }
      

    return (
        <div>
        <ProfileForm 
            handleChange={ handleChange }
            handleReset={ handleReset }
            handleSubmit={ handleSubmit }
            details= { details }
            error={ errorState }
        />

        </div>
    )
}

export async function getServerSideProps(req) {
    return getUser(req)
}


export default Profile