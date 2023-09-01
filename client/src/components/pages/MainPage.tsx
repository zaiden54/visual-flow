import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import VideoList from '../ui/VideoList';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import ModalWindow from '../ui/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getRandomVideoThunk, getSubVideoThunk } from '../../redux/slices/video/videoThunk';

const videos1 = [
  {
    title: '1 video',
    channel: 'Ololoshka',
    views: 3,
    createdAt: '12 september',
    preview: 'lol',
  },
  {
    title: '2 video',
    channel: 'Ololoshka',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'Ololoshka',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'Ololoshka',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'Ololoshka',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
];

const videos2 = [
  {
    title: '1 video',
    channel: 'evgeha',
    views: 3,
    createdAt: '12 september',
    preview: 'lol',
  },
  {
    title: '2 video',
    channel: 'evgeha',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'evgeha',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'evgeha',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
  {
    title: '2 video',
    channel: 'evgeha',
    views: 7,
    createdAt: '12 september',
    preview: 'kek',
  },
];
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
  });
console.log('-------',random);


  
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
