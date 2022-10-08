import react from 'react';
import { useChannelContext } from '../Channels.Context';

export const ChannelUsers = () => {
  const { users } = useChannelContext();

  return (
    <div>
      {users.map((x, i) => {
        return <div key={i}>{x.name}</div>;
      })}
    </div>
  );
};
