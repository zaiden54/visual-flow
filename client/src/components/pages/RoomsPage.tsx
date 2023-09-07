import { Box, List, ListItem } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/hooks/reduxHooks';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import RoomListItem from '../ui/RoomListItem';

export default function RoomsPage(): JSX.Element {
  const rooms = useAppSelector((state) => state.rooms);

  return (
    <>
      <div>ROOMS</div>
      <ModalWindow />
      <MenuLeft />
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '2rem',
          marginBottom: '2rem',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginTop: '5rem',
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
            {rooms.map((room) => (
              <ListItem key={room.id}>
                <RoomListItem room={room}  />
                {/* <div>Hello</div> */}
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
    </>
  );
}
