import Box from '@mui/material/Box';
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
        flexDirection: 'row',
        marginTop: '2rem',
        marginBottom: '2rem',
        justifyContent: 'flex-start',
      }}
    >
      {videos?.map((el) => <VideoCard video={el} />)}
    </Box>
  );
}
