import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import type { VideoType } from '../../types/videotypes';
import VideoCard from './VideoCard';

type VideoListProps = { videos: VideoType[] };

export default function VideoList({ videos }: VideoListProps): JSX.Element {
  console.log(videos);

  return (
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
      {/* <Grid container spacing={2}> */}
      {videos?.map((el) => <VideoCard video={el} />)}
    </Box>
  );
}
