import { useEffect, useState, useCallback, useContext } from 'react';
import { AuthContext } from '../../../../services/Auth';
import { supabase } from '../../../../services/supabaseClient';

/**
 * Given a channel, fetches userprofiles in those channels
 * Normally, this should be done by querying many-to-many relation
 */
export const useChannelUsers = (channelId) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (channelId) {
      fetchUsers(channelId);
    }
  }, [channelId]);

  const fetchUsers = async (channelId) => {
    let { data, error } = await supabase
      .from('ChannelUserProfile')
      .select(
        `
      *,
      UserProfiles ( * )
      `,
      )
      .eq('channel_id', channelId);

    if (!data?.length) {
      setUsers([]);
      return;
    }

    setUsers(data.map((x) => x.UserProfiles));
  };

  return users;
};

export const useJoinChannel = (userProfileId) => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const selectChannel = useCallback(async (channelId) => {
    if (selectChannel === channelId) {
      return;
    }

    // check if the user has already joined the channel
    let { data, error } = await supabase
      .from('ChannelUserProfile')
      .select('*')
      .eq('userprofile_id', userProfileId)
      .eq('channel_id', channelId);

    // if they haven't joined it yet, join it.
    if (!data.length) {
      await joinChannel(channelId);
    }

    // now set that channel as selected channel
    setSelectedChannel(channelId);
  });

  const joinChannel = async (channelId) => {
    await supabase
      .from('ChannelUserProfile')
      .insert({
        userprofile_id: userProfileId,
        channel_id: channelId,
        role: 'admin',
      })
      .throwOnError();
  };

  return [selectedChannel, selectChannel];
};

export const useUserProfile = () => {
  const user = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id).then((profile) => {
        if (profile) {
          setUserProfile(profile);
        }
      });
    }
  }, [user]);

  const fetchUserProfile = async (id) => {
    const { data, error } = await supabase
      .from('UserProfiles')
      .select('*')
      .eq('user_id', id)
      .single()
      .throwOnError();

    return data;
  };

  return userProfile;
};

export const useChannelSubscription = () => {};
