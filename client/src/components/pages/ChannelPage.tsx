import React from 'react';
import { useAppSelector } from '../../redux/hooks/reduxHooks';
import VideoList from '../ui/VideoList';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';

export default function ChannelPage(): JSX.Element {
  const channel = useAppSelector((state) => state.channel);


  return (
    <>
      <MenuLeft />
      <NavBar />
      <div
        style={{ display: 'flex', marginTop: '5rem', flexWrap: 'wrap', flexDirection: 'column' }}
      >
        <div>{channel.name} channel</div>
        <div>{channel.Subscriptions?.length} subscribers</div>
        <VideoList videos={channel?.Videos} />
      </div>
    </>
  );
}
