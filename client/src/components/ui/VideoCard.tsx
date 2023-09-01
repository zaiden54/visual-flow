import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { VideoType } from '../../types/videotypes';

export type VideoCardProps = {
  video: VideoType;
  Channel: string;
};

export default function VideoCard({ video, Channel }: VideoCardProps): JSX.Element {
  console.log('===============',video.preview);
  
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', margin: '2' }}>
      <CardMedia component="img" sx={{ width: 151 }} image={`http://localhost:3001${video.preview}`} alt={video.title} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {video.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <Stack direction="row" spacing={2} style={{ padding: '1px', alignItems: 'center' }}>
              <Avatar sx={{ width: 24, height: 24 }} alt="AVA" src="#" />
              <Stack direction="column">{Channel}</Stack>
            </Stack>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <Stack direction="row">{video.views} views</Stack>
            <Stack direction="row">{video.createdAt}</Stack>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}