import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/reduxHooks';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoList from '../ui/VideoList';

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
