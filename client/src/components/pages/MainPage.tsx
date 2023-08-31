import { Divider } from '@mui/material';
import React from 'react';
import VideoList from '../ui/VideoList';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import ModalWindow from '../ui/ModalWindow';

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
  return ( 
    <>
        <ModalWindow/>
        <MenuLeft />
        <NavBar/>
      <div style={{ marginTop: '5rem'}}>
        <VideoList videos={videos1} />
        <Divider />
        <VideoList videos={videos2} />
      </div>
    </>
  );
}
