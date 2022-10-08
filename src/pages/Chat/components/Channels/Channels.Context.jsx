import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  createContext,
} from 'react';
import { supabase } from '../../../../services/supabaseClient';
import { Channels } from './Channels';

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
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchChannels = async () => {
    // fetch and sets channels
    let { data, error } = await supabase.from('Channels').select(`
    *,
      ChannelUserProfile ( * )
    `);

    if (!data) {
      return;
    }
    console.log(data);
    setChannels(data)
  };

  useEffect(() => {
    if (!selectedChannel) {
      return;
    }

    const userProfileIds = selectedChannel.ChannelUserProfile.map((x) => x.userprofile_id);
    console.log(userProfileIds);
    fetchUsers(userProfileIds);
  }, [selectedChannel]);

  const fetchUsers = async (userIds) => {
    // fetch and sets channels
    let { data, error } = await supabase
      .from('UserProfiles')
      .select(
        `
          *
        `,
      )
      .in({ id: userIds });

    if (!data) {
      return [];
    }

    setUsers(data);
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

  const joinChannel = useCallback(async (channelId) => {
    console.log('joinChannel', channelId);
    // leave the current channel
    // join a user to new channel
    const { data, error } = await supabase
      .from('ChannelUserProfile')
      .insert({ userprofile_id: 2, channel_id: channelId, role: 'admin' });
  });

  return (
    <ChannelContext.Provider
      value={{
        channels,
        addChannel,
        joinChannel,
        users,
        setSelectedChannel,
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
