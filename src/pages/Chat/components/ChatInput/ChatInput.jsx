import React from 'react';
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
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export const ChatInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <HStack>
        <FormControl isInvalid={errors.email}>
          <Input
            flexGrow={1}
            id="message"
            type="text"
            {...register('message', {
              required: 'You cant send empty message!',
            })}
          />
        </FormControl>
        <Button type="submit" minWidth="75px">
          Send
        </Button>
      </HStack>
    </form>
  );
};
