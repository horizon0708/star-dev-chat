import { supabase } from '../../services/supabaseClient';
import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { paths } from '../../services/path';
import { useRef } from 'react';

export default function SignOut() {
  const toast = useToast();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }
    supabase.auth.signOut().then(() => {
      navigate(paths.signin);
    });
    toast({
      status: 'success',
      title: 'Logged out',
      description: 'Sign In again!',
    });
    hasRun.current = true;
  }, [hasRun.current]);

  return <></>;
}
