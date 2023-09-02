import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import getRandomVideoThunk, { getSubVideoThunk } from '../../redux/slices/video/videoThunk';
import VideoList from './VideoList';

export default function VideosMap(): JSX.Element {
  const dispatch = useAppDispatch();

  const subVideos = useAppSelector((state) => state.videos);

  useEffect(() => {
    void dispatch(getSubVideoThunk());
  }, []);

  const random = useAppSelector((state) => state.random);
  useEffect(() => {
    void dispatch(getRandomVideoThunk());
  }, []);

  console.log(random);

  return (
    <div style={{ marginTop: '5rem', flexWrap: 'wrap' }}>
      <VideoList videos={subVideos} />

      <Divider />
      <VideoList videos={random} />
    </div>
  );
}
