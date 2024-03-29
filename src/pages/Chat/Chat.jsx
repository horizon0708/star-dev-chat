import React from 'react';
import { Channels } from './components/Channels/Channels';
import { ChatInput } from './components/ChatInput/ChatInput';
import { Messages } from './components/Messages/Messages';
import { Users } from './components/Users/Users';
import { Flex } from '@chakra-ui/react';
import { navBarHeight } from '../../components/Navbar/Navbar';

export const Chat = () => {
  return (
    <Flex direction="row" spacing={2} minH={`calc(100vh - ${navBarHeight})`}>
      <Channels width="250px" />
      <Flex direction="column" flexGrow={1}>
        <Messages />
        <ChatInput />
      </Flex>
      {/* <Users /> */}
    </Flex>
  );
};
