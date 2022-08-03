import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast';

export async function signOut() {
        try {
            const {error} = await supabase.auth.signOut()
            if (error) toast.error("Logout Unsuccessful")
            else toast.success("Logout Successful")
        } catch (error) {
            toast.error("Logout Unsuccessful")
        }
    }
