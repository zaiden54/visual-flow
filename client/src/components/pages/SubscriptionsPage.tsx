import { Box, List, ListItem } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getAllSubVideoThunk } from '../../redux/slices/video/videoThunk';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideoListItem from '../ui/VideoListItem';

export default function SubscriptionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const videos = useAppSelector((state) => state.videos);
  useEffect(() => {
    void dispatch(getAllSubVideoThunk());
  }, []);

  return (
    <>
      <ModalWindow />
      <MenuLeft />
      <NavBar />
      {user.status === 'logged' ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            // marginTop: '2rem',
            marginBottom: '2rem',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <motion.div
            animate={{ y: 20 }}
            transition={{ type: 'spring', stiffness: 80 }}
            style={{
              display: 'flex',
              // marginTop: '5rem',
              margin: 6,
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
          </motion.div>
        </Box>
      ) : (
        <div style={{ display: 'flex', marginTop: '7%' }}>Войдите в аккаунт</div>
      )}
    </>
  );
}
