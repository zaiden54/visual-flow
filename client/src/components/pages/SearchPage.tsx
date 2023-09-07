import { Box, Button, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideoListItem from '../ui/VideoListItem';
import { addSearchThunk, searchThunk } from '../../redux/slices/search/searchThunk';

export default function SearchPage(): JSX.Element {

  const [offset, setOffset] = useState(0)

  const searchString = useParams();
  const dispatch = useAppDispatch();
  const searchVideos = useAppSelector((state) => state.search);
  
  useEffect(() => {
    void dispatch(searchThunk({searchString, offset}))
  }, [searchString])

  return (
    <>
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
            {searchVideos?.rows?searchVideos.rows.map((el) => (
              <ListItem key={el.id}>
                <VideoListItem video={el} />
              </ListItem>
            )): false}
            {searchVideos.rows?.length !== searchVideos.count ? <Button onClick={() => dispatch(addSearchThunk({searchString, offset: searchVideos.rows.length}))}>Загрузить ещё</Button> : false}
          </List>
        </div>
      </Box>
    </>
  );
}
