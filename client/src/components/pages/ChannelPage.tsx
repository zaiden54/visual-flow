import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoList from '../ui/VideoList';
import { getChannelThunk } from '../../redux/slices/channel/channelThunk';

export default function ChannelPage(): JSX.Element {
  const channel = useAppSelector((state) => state.channel);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getChannelThunk(id));
  }, [id]);

  return (
    <>
      <MenuLeft />
      <NavBar />
      <div
        style={{
          display: 'flex',
          marginTop: '5rem',
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>{channel.name} channel</div>
        <div>{channel.Subscriptions?.length} subscribers</div>
        <VideoList videos={channel?.Videos} />
      </div>
    </>
  );
}
