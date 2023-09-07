import { Divider, Button } from '@mui/material';
// import Button from '@mui/material-next/Button';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getSubVideoThunk, getRandomVideoThunk } from '../../redux/slices/video/videoThunk';
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
    <div
      style={{
        display: 'flex',
        marginTop: '5rem',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {user.data.status === 'logged' && (
        <>
          <h4>Подписки</h4>
          <VideoList videos={videos.slice(0, 8)} />
          {videos.length > 8 && (
            <Link to="/subs">
              <Button type="button">ЕЩЕ</Button>
              {/* <Button size="small" variant="elevated" type="button" color="primary" /> */}
            </Link>
          )}
          <Divider />
        </>
      )}
      <h4>Рекомендации</h4>
      <VideoList videos={random} />
    </div>
  );
}
