import React from 'react';
import { ChannelContextProvider } from './Channels.Context';
import { Box, Heading } from '@chakra-ui/react';
import { AddChannelButton } from './components/AddChannelButton';
import { ChannelList } from './components/ChannelList';


export const Channels = ({ ...props }) => {
  return (
    <ChannelContextProvider>
      <Box {...props}>
        <ChannelList />
        <AddChannelButton />
      </Box>
    </ChannelContextProvider>
  );
};
