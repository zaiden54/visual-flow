import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getChannelThunk } from '../../redux/slices/channel/channelThunk';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoList from '../ui/VideoList';

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

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '2rem',
          marginBottom: '2rem',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginTop: '5rem',
            flexWrap: 'wrap',
            flexDirection: 'column',
          }}
        >
          <div>{channel.name} channel</div>
          <div>{channel.Subscriptions?.length} subscribers</div>
          <VideoList videos={channel?.Videos} />
        </div>
      </Box>
    </>
  );
}
