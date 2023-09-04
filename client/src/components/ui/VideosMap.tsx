import { Button, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import getRandomVideoThunk, { getSubVideoThunk } from '../../redux/slices/video/videoThunk';
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
        flexFlow: 'wrap',
      }}
    >
      {user.data.status === 'logged' && (
        <>
          <h4>Подписки</h4>

          <VideoList videos={subVideos} />
          <Button
            type="button"
            onClick={() => {
              window.location.href = '/subs';
            }}
          >
            ЕЩЕ
          </Button>
          <Divider />
        </>
      )}

      <h4>Рекомендации</h4>
      <VideoList videos={random} />
    </div>
  );
}
