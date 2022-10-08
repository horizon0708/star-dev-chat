import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  createContext,
} from 'react';
import { supabase } from '../../../../services/supabaseClient';
import { Channels } from './Channels';
import {
  useChannelUsers,
  useJoinChannel,
  useUserProfile,
} from './Channels.Hooks';

const ChannelContext = createContext();

export const ChannelContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'mock channel',
    },
  ]);

  const userProfile = useUserProfile();
  const [selectedChannelId, joinChannel] = useJoinChannel(userProfile?.id);
  const users = useChannelUsers(selectedChannelId);

  const fetchChannels = async () => {
    // fetch and sets channels
    let { data, error } = await supabase.from('Channels').select(`
    *,
      ChannelUserProfile ( * )
    `);

    if (!data) {
      return;
    }
    setChannels(data);
  };

  useEffect(() => {
    // get and set channels using supabase subscription
    fetchChannels();
  }, []);

  const addChannel = useCallback(async (channelName) => {
    console.log('addChannel', channelName);

    const { data, error } = await supabase
      .from('Channels')
      .insert([{ title: channelName }]);

    await fetchChannels();
  });

  return (
    <ChannelContext.Provider
      value={{
        channels,
        addChannel,
        joinChannel,
        users,
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
