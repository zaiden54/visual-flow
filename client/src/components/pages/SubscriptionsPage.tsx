import { Box, List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getAllSubVideoThunk } from '../../redux/slices/video/videoThunk';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideoListItem from '../ui/VideoListItem';

export default function SubscriptionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videos);
  useEffect(() => {
    void dispatch(getAllSubVideoThunk());
  }, []);

  return (
    <>
      <div>SUUUBS</div>
      <ModalWindow />
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
            width: '100%',
          }}
        >
          <List
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '70px',
            }}
          >
            {videos.map((el) => (
              <ListItem key={el.id}>
                <VideoListItem video={el} />
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
    </>
  );
}
