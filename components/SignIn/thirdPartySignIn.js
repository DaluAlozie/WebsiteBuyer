import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast';

export async function signInGoogle(e) {
  e.preventDefault()
  const { user, session, error } = await supabase.auth.signIn({
          provider: 'google'
  })
  console.log(error);
}
export async function signInAzure(e) {
  e.preventDefault()
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'azure',
  })
}
export async function signInFacebook(e) {
  e.preventDefault()

 const { user, session, error } = await supabase.auth.signIn({
     provider: 'facebook'
  })
}

export async function signInLinkedin(e) {
  e.preventDefault()
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'Linkedin',
  })
}

