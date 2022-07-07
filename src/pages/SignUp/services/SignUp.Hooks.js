import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../services/path';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [navbar,setNavbar] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  return {
    signUp: async ({ email, password }) => {
      try {
        setLoading(true);
        setNavbar(true);


        const { error } = await supabase.auth.signUp({ email, password, navbar });
        if (error) throw error;
        toast({
          status: 'success',
          title: 'Sign up success',
          description: 'Check your mailbox!',
        });
        navigate(paths.home);
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
