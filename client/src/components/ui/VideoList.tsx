import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import type { VideoType } from '../../types/videotypes';
import VideoCard from './VideoCard';

type VideoListProps = { videos: VideoType[] };

export default function VideoList({ videos }: VideoListProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',

        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Grid container spacing={2}>
        {videos?.map((el) => (
          <Grid key={el.id} item xs={3} md={3}>
            <VideoCard video={el} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
