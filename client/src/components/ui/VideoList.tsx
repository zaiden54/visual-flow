import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import type { ChannelType } from '../../types/videotypes';
import VideoCard from './VideoCard';

type VideoListProps = { videos: ChannelType[] };

export default function VideoList({ videos }: VideoListProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        // flexGrow: 1,
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Grid container spacing={2}>
        {videos.map(
          (el) =>
            el.Videos?.map((ol) => (
              <Grid key={ol.id} item xs={3}>
                <VideoCard  video={ol} Channel={el.name} />
              </Grid>
            )),
        )}
      </Grid>
    </Box>
  );
}
