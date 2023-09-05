import { Box, Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getChannelThunk } from '../../redux/slices/channel/channelThunk';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoList from '../ui/VideoList';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
            justifyContent: 'center',
          }}
        >
          {/* <Card style={{display:"flex",flexDirection:'column',justifyContent:'center'}}>
            <CardContent> */}
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
                  <Stack direction="row" spacing={2}>
                    <Stack direction="column">{channel.Subscriptions.length} subscribers</Stack>
                    <Stack direction="column">{channel.Videos.length} videos</Stack>
                  </Stack>
                </Stack>
              </Stack>
            {/* </CardContent>
          </Card> */}
          <VideoList videos={channel?.Videos} />
        </div>
      </Box>
    </>
  );
}
