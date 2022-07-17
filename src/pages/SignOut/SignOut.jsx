import { supabase } from '../../services/supabaseClient';
import React  from 'react';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { paths } from '../../services/path';

export default function SignOut() {
    const toast = useToast();
    const navigate = useNavigate();

   useEffect(()=>{
    supabase.auth.signOut().then(() => {
        navigate(paths.signin);
    })
    toast({
        status: 'success',
        title: 'Sign out success',
        description: 'Sign In again!',
      });
   }
   ,[])

return <> 
      
</>
}