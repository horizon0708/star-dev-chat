import {
  Box,
  Heading,
  Center,
  Spinner,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useSignUp } from './services/SignUp.Hooks';
import { useForm } from 'react-hook-form';

export const SignUp = () => {
  const { signUp, loading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Center>
      <div>Sign up</div>
      <Box p={8}>
        {loading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={handleSubmit(signUp)}>
            <Heading mb={8}>Sign up</Heading>
            <FormControl mb={4} isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required to sign up',
                })}
              />
              {errors.email && (
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required to sign up',
                })}
              />
              {errors.password && (
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button type="submit" width="100%">
              Sign up
            </Button>
          </form>
        )}
      </Box>
    </Center>
  );
};
