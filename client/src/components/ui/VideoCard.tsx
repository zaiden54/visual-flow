import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import React from 'react';

import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import type { VideoType } from '../../types/videotypes';

type VideoCardProps = {
  video: VideoType;
};

export default function VideoCard({ video }: VideoCardProps): JSX.Element {
  return (
    <Link to={`/watch/${video.link}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: 'flex',

          flexDirection: 'column',
          margin: 2,
          borderRadius: '10px',
          minWidth: '380px',
          maxWidth: '380px',
          maxHeight: '350px',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
          image={`http://localhost:3001${video.preview}`}
          alt={video.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              component="div"
              variant="h6"
              style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
            >
              {video.title.length > 23 ? video.title.substring(0, 23) + '...' : video.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <Stack direction="row" spacing={2} style={{ padding: '1px', alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }} alt={video.Channel.name} src="#" />
                <Stack direction="column">{video.Channel.name}</Stack>
              </Stack>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <Stack direction="row">{video.views} просмотров</Stack>
              <Stack direction="row">
                {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true, locale: ru })}
              </Stack>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
