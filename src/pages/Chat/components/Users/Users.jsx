import { Flex, Heading, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { useChannelContext } from '../Channels/Channels.Context';

export const Users = () => {
  const { users } = useChannelContext();
  return (
    <Flex direction="column">
      <Heading size="sm" mb={2}>
        Users in channel
      </Heading>

      <Stack>
        {users?.map(({ id, username }) => {
          return <Box key={id}>{username}</Box>;
        })}
      </Stack>
    </Flex>
  );
};
