import {useState} from 'react';
import { useToast } from '@chakra-ui/react';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
     
    const history =useNavigate();

    const [loading,setLoading]=useState(false);
    const toast=useToast();
    return {
        signIn: async ({ email, password }) => {
          try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email, password });
            if (error){
              alert('error signin ')
              // history('/signup')
            }else {
                history('/')
            }
            toast({
              status: 'success',
              title: 'Sign In success',
              description: 'Start a Chat',
            });
            setLoading(false);
          } catch (error) {
            toast({
              status: 'error',
              title: 'Error',
              description: error.error_description || error.message,
            });
            setLoading(false);
          }
        },
        loading,
      };
    
};

