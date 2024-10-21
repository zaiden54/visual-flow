import { Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getRandomVideoThunk, getSubVideoThunk } from '../../redux/slices/video/videoThunk';
import VideoList from './VideoList';

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
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {user.status === 'logged' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h4>Подписки</h4>
          </div>
          <VideoList videos={videos.slice(0, 8)} />
          {videos.length > 8 && (
            <Link to="/subs" style={{ display: 'flex', width: '100%' }}>
              <Button style={{ display: 'flex', width: '100%' }} type="button">
                ЕЩЕ
              </Button>
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
