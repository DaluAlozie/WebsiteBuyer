import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Linkedin({req}) {

    const router = useRouter()

    useEffect(() => {
      handleLogin()
    }, [router])
  
  async function handleLogin(){
    const code = router.query["code"]
    console.log(code);

    const response = await fetch("/api/linkedin_callback", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({code}),
    })
    .then(res=> res.json())


    console.log(response);
    const access_token = response.access_token

    if (access_token) {
      
    }
  
  }
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
    </div>
  )
}

