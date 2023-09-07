import { Divider, Button } from '@mui/material';
// import Button from '@mui/material-next/Button';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getSubVideoThunk, getRandomVideoThunk } from '../../redux/slices/video/videoThunk';
import VideoList from './VideoList';
import { motion, useScroll } from 'framer-motion';

export default function VideosMap(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const videos = useAppSelector((state) => state.videos);

  useEffect(() => {
    void dispatch(getSubVideoThunk());
  }, []);

  const random = useAppSelector((state) => state.random);
  useEffect(() => {
    void dispatch(getRandomVideoThunk());
  }, []);

  return (
    <motion.div
      animate={{ y: 60 }}
      transition={{ type: 'spring', stiffness: 55 }}
      style={{
        display: 'flex',
        // marginTop: '5rem',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {user.data.status === 'logged' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              // alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <h4>Подписки</h4>
          </div>
          <VideoList videos={videos.slice(0, 8)} />
          {videos.length > 8 && (
            <Link to="/subs" style={{ display: 'flex', width: '100%' }}>
              <Button style={{ display: 'flex', width: '100%' }} type="button">ЕЩЕ</Button>
            </Link>
          )}
          <Divider />
        </>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <h4>Рекомендации</h4>
      </div>
      <VideoList videos={random} />
    </motion.div>
  );
}
