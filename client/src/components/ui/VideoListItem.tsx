import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import type { VideoType } from '../../types/videotypes';

type VideoCardProps = {
  video: VideoType;
};
export default function VideoListItem({ video }: VideoCardProps): JSX.Element {
  return (
    <Link to={`/watch/${video.link}`} style={{ textDecoration: 'none', width: '100%' }}>
      <Card sx={{ display: 'flex', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: '400px', height: '200px', objectFit: 'cover' }}
          image={`http://localhost:3001${video.preview}`}
          alt={video.title}
        />
        <Box sx={{ display: 'flex', alignItems: 'start', pl: 1, pb: 1, width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {video.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {video.views} views | {video.createdAt}
            </Typography>
            <Stack direction="row" spacing={2} style={{ padding: '1px', alignItems: 'center' }}>
              <Avatar alt={video.Channel.name} src="#" />
              <Stack direction="column">{video.Channel.name}</Stack>
            </Stack>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {video.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
