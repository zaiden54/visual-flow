import { List, ListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getAllSubVideoThunk } from '../../redux/slices/video/videoThunk';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideoListItem from '../ui/VideoListItem';

export default function SubscriptionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const subVideos = useAppSelector((state) => state.subVideos);
  useEffect(() => {
    void dispatch(getAllSubVideoThunk());
  }, []);

  return (
    <>
      <div>SUUUBS</div>
      <ModalWindow />
      <MenuLeft />
      <NavBar />
      <List
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '70px',
        }}
      >
        {subVideos.map((el) => (
          <ListItem key={el.id}>
            <VideoListItem video={el} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
