import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getRandomVideoThunk, getSubVideoThunk } from '../../redux/slices/video/videoThunk';
import VideoList from './VideoList';

export default function VideosMap(): JSX.Element {
  const dispatch = useAppDispatch();
  const channelsAndVideos = useAppSelector((state) => state.videos);
  useEffect(() => {
    void dispatch(getSubVideoThunk());
  }, []);
  console.log(channelsAndVideos);

  const random = useAppSelector((state) => state.random);
  useEffect(() => {
    void dispatch(getRandomVideoThunk());
  }, []);

  return (
    <div style={{ marginTop: '5rem', flexWrap: 'wrap' }}>
      <VideoList videos={channelsAndVideos} />
      <Divider />
      <VideoList videos={channelsAndVideos} />
    </div>
  );
}
