import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  createContext,
} from 'react';

const ChannelContext = createContext({
  channels: [],
});

export const ChannelContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'mock channel',
    },
  ]);

  useEffect(() => {
    //get and set channels using supabase subscription
  }, []);

  const addChannel = useCallback((channelName) => {
    console.log('addChannel', channelName);
    // add channel to supabase
  });

  const joinChannel = useCallback((channelId) => {
    console.log('joinChannel', channelId);
    // leave the current channel
    // join a user to new channel
  });

  return (
    <ChannelContext.Provider
      value={{
        channels,
        addChannel,
        joinChannel,
      }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('must be used inside ChannelContextProvider');
  }

  return context;
};
