import { supabase } from '../utils/supabaseClient'


export default async function checkAnonUser({req}) {
    // Fetch data from external API

    const { user, error } = await supabase.auth.api.getUserByCookie(req)

    if (user) {
        return { props: { user }, redirect: { destination: "/#" } }
    }

    // Pass data to the page via props
    return { props: { headers: req.headers} }
}