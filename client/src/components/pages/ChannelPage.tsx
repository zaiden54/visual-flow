import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getChannelThunk } from '../../redux/slices/channel/channelThunk';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoList from '../ui/VideoList';
import { addSubThunk } from '../../redux/slices/subs/subThunk';

export default function ChannelPage(): JSX.Element {
  const channel = useAppSelector((state) => state.channel);
  const user = useAppSelector((state) => state.user.data);
  // const subs = useAppSelector((state)=>state.subs.rows)
  const { id } = useParams();
  // const userId = user.id;
  // const channelId = channel.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getChannelThunk(id));
  }, [id]);

  console.log('----------',channel);
  
  return (
    <>
      <MenuLeft />
      <NavBar />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
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
            justifyContent: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            style={{
              padding: '1px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              width: '90%',
            }}
          >
            <Avatar alt={channel.name} sx={{ width: 56, height: 56 }} src="#" />
            <Stack direction="column">
              <Stack direction="column">{channel.name}</Stack>

              {/* {user.id !== channel.userId ? (
                <Button
                  style={{ width: '100px', height: '30px', fontSize: '11px' }}
                  variant="contained"
                  onClick={() => {
                    if (user.status === 'logged') {
                      void dispatch(addSubThunk({ userId, channelId }));
                    }
                  }}
                >
                  {subs.find((el) => el.userId === user.id)
                    ? 'Отписаться'
                    : 'Подписаться'}
                </Button>
              ) : (
                false
              )} */}
              <Stack direction="row" spacing={2}>
                <Stack direction="column">{channel.Subscriptions?.length} subscribers</Stack>
                <Stack direction="column">{channel.Videos?.length} videos</Stack>
              </Stack>
            </Stack>
          </Stack>
          <VideoList videos={channel?.Videos} />
        </div>
      </Box>
    </>
  );
}
