import { supabase  } from "../../utils/supabaseClient"

export default async function handler(req, res) {

    const data = {
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: "http://localhost:3000/linkedin-login",
        client_id: process.env.LINKEDIN_ID,
        client_secret: process.env.LINKEDIN_SECRET
    }

    let formBody = [];

    for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(res=>res.json())
    
    res.status(200).json(responses)
}
  