import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useChannelContext } from '../Channels.Context';

export const AddChannelButton = () => {
  const { addChannel } = useChannelContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const createChannel = ({ channelName }) => {
    addChannel(channelName);
  };
  console.log(errors);

  return (
    <Box my={4}>
      <form onSubmit={handleSubmit(createChannel)}>
        <FormControl isInvalid={errors.channelName}>
          <FormLabel htmlFor="channelName">Channel name</FormLabel>
          <Input
            id="channelName"
            type="text"
            {...register('channelName', {
              required: 'Need a channel name',
              minLength: {
                value: 3,
                message: 'must be longer than 3 characters',
              },
              maxLength: {
                value: 15,
                message: 'must be shorter than 15 characters',
              },
            })}
          />
          {errors.channelName && (
            <FormErrorMessage>{errors?.channelName?.message}</FormErrorMessage>
          )}
          <Button type="submit" width="100%" variant="ghost">
            + Add Channel
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
