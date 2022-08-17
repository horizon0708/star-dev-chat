import { Button } from '@chakra-ui/react';
import React from 'react';
import { useChannelContext } from '../Channels.Context';
import { Flex } from '@chakra-ui/react';

export const ChannelList = () => {
  const { channels, joinChannel } = useChannelContext();
  return (
    <Flex my={4}>
      {channels.map(({ id, name }) => {
        return (
          <Button key={id} id={id} onClick={() => joinChannel(id)} width="100%">
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
