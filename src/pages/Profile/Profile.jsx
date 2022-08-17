import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../services/Auth';
import { supabase } from '../../services/supabaseClient';
import { useForm } from 'react-hook-form';
import {
  Box,
  Center,
  FormLabel,
  Input,
  Button,
  Spinner,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { paths } from '../../services/path';
import { useToast } from '@chakra-ui/react';

export const Profile = ({ session }) => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // if the project uses a form handling library like react-hook-form, you should always use it
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    // with mode set to 'all', react-hook-form will run the validation every time the field changes and on blur
    // it defaults to 'onSubmit'
    // https://react-hook-form.com/api/useform#props
  } = useForm({ mode: 'all' });
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('UserProfiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        throw new Error('User does not exist');
      }

      // setValue is used to set the value of the form
      // https://react-hook-form.com/api/useform/setvalue
      setValue('username', data.username);
    } catch (error) {
      toast({
        status: 'error',
        title: 'Oops',
        description: 'Something went wrong! Please try reloading the page',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username }) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('UserProfiles')
        .update({ username })
        .match({ user_id: user.id });

      if (error) {
        throw error;
      }

      // it's always a good idea to trigger a refetch after updating something
      await fetchProfile();

      toast({
        status: 'success',
        title: 'Profile update',
        description: 'Your profile has been updated successfully!',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Profile update error',
        description: 'Your profile could not be updated. Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <form onSubmit={handleSubmit(updateProfile)}>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email </FormLabel>
            <Input id="email" type="email" disabled value={user.email} />
          </FormControl>
          <FormControl mb={4} isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="username"
              {...register('username', {
                required: 'You cannot register a blank username',
                minLength: {
                  value: 5,
                  message: 'Username must be longer than 5 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Username must be shorter than 15 characters',
                },
              })}
            />
            {errors.username && (
              <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button p={6} mt={6} type="submit" width="100%" isLoading={loading}>
            Update Profile
          </Button>
          <Center mt={6}>
            <Link to={paths.signout}>Sign Out</Link>
          </Center>
        </form>
      )}
    </Box>
  );
};
