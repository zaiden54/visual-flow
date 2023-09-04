import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import getRandomVideoThunk, { getSubVideoThunk } from '../../redux/slices/video/videoThunk';
import VideoList from './VideoList';

export default function VideosMap(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const subVideos = useAppSelector((state) => state.videos);

  useEffect(() => {
    void dispatch(getSubVideoThunk());
  }, []);

  const random = useAppSelector((state) => state.random);
  useEffect(() => {
    void dispatch(getRandomVideoThunk());
  }, []);

  return (
    <div style={{ marginTop: '5rem', flexWrap: 'wrap' }}>
      {user.data.status === 'logged' && (
        <>
          <h4>Подписки</h4>
          <VideoList videos={subVideos} />
          <Divider />
        </>
      )}

      <h4>Рекомендации</h4>
      <VideoList videos={random} />
    </div>
  );
}