import { supabase } from '../utils/supabaseClient'


export default async function checkAuthUser({req}) {
    // Fetch data from external API

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: "/sign-in" } }
    }

    // Pass data to the page via props
    return { props: { user } }
}