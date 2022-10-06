import { Button } from '@chakra-ui/react';
import React from 'react';
import { useChannelContext } from '../Channels.Context';
import { Flex, VStack } from '@chakra-ui/react';
import { AuthContext } from '../../../../../services/Auth';

export const ChannelList = () => {
  const { channels, joinChannel } = useChannelContext();
  return (
    <Flex my={4}>
      <VStack>

      {channels.map(({ id, title}) => {
        return (
          <Button key={id} id={id} onClick={() => joinChannel(id)} width="100%" >
            {title}
          </Button>
        );
      })}
      </VStack>
      
    </Flex>
  );
};
