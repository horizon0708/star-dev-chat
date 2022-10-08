import React from 'react';
import { Box } from '@chakra-ui/react';
import { AddChannelButton } from './components/AddChannelButton';
import { ChannelList } from './components/ChannelList';

export const Channels = ({ ...props }) => {
  return (
    <Box {...props}>
      <ChannelList />
      <AddChannelButton />
    </Box>
  );
};
