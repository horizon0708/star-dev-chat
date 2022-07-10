import { supabase } from '../../services/supabaseClient';
import React  from 'react';

import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { paths } from '../../services/path';

export default function Logout() {
  const navigate = useNavigate();
   useEffect(()=>{
       const initialize = async () => await supabase.auth.signOut()
       initialize()
       navigate(paths.signin)
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session)=>{
            console.log("this")
            const body = JSON.stringify({event, session})
            const headers = new Headers ({'Content-Type':'application/json'})

            await fetch ('/api/login', {
                method: 'post',
                body,
                headers,
                credentials: 'same-origin',
            })
            console.log("out")
        }
        )
        return ()=>{
            authListener.unsubscribe();
        }
    }
   ,[])

return <> 
      
</>
}