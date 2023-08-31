import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import type { ChannelType } from '../../types/videotypes';
import VideoCard from './VideoCard';

export type VideoListProps = { videos: ChannelType[] };

export default function VideoList({ videos }: VideoListProps): JSX.Element {
  // console.log(videos);

  return (
    <Box sx={{ flexGrow: 1, marginTop: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <Grid container spacing={2}>
        {videos.map(
          (el) =>
            el.Videos?.map((ol) => (
              <Grid item xs={3}>
                <VideoCard video={ol} Channel={el.name} />
              </Grid>
            )),
        )}
      </Grid>
    </Box>
  );
}
