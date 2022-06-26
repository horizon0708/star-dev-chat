import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { supabase } from '../../../services/supabaseClient';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return {
    signUp: async ({ email, password }) => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({
          status: 'success',
          title: 'Sign up success',
          description: 'Check your mailbox!',
        });
        // TODO: redirect
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
