import { Button, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getSubVideoThunk, getRandomVideoThunk } from '../../redux/slices/video/videoThunk';
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
          <VideoList videos={subVideos.slice(0, 8)} />
          {subVideos.length > 8 && (
            <Link to="/subs">
              <Button type="button">ЕЩЕ</Button>
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
