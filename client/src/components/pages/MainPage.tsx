/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import VideoList from '../ui/VideoList';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import ModalWindow from '../ui/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getRandomVideoThunk, getSubVideoThunk } from '../../redux/slices/video/videoThunk';

export default function MainPage(): JSX.Element {
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
    <>
        <ModalWindow/>
      <MenuLeft />
      <NavBar />
      <div style={{ marginTop: '5rem' }}>
        <VideoList videos={channelsAndVideos} />
        <Divider />
        <VideoList videos={random} />
      </div>
    </>
  );
}
