/* eslint-disable react/jsx-boolean-value */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { getWatchThunk, setLikeThunk } from '../../redux/slices/video/watchThunk';
import Comments from '../ui/Comments';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';

import { addSubThunk } from '../../redux/slices/subs/subThunk';
import apiService from '../../services/config';

export default function VideoPage(): JSX.Element {
  const [start, setStart] = useState(Date.now());

  const user = useAppSelector((state) => state.user.data);
  const video = useAppSelector((state) => state.currentVideo);
  // console.log(video)

  useEffect(
    () => () => {
      if (Date.now() - start > 15 * 1000 && video) {
        // console.log('first');
        apiService
          .put(`/watch/${video?.link}`)
          .then(({ data }) => console.log(data))
          .catch((err) => console.error(err));
      }
    },
    [],
  );

  const dispatch = useAppDispatch();

  const { link } = useParams();

  useEffect(() => {
    if (link) {
      void dispatch(getWatchThunk(link));
    }
  }, []);

  const videoId = video?.id;
  const userId = user.id;
  const channelId = video?.Channel.id;

  return (
    <div>
      <MenuLeft />
      <NavBar />
      <Stack
        style={{ marginTop: 90, display: 'flex', alignContent: 'center', zIndex: -3 }}
        spacing={1}
      >
        <div>
          <Card style={{ marginTop: 0 }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <video
                id="videoPlayer"
                style={{ alignSelf: 'center' }}
                width={910}
                height={500}
                controls
                muted={true}
                autoPlay
              >
                {link && <source src={`http://localhost:3001/api/watch/${link}`} />}
              </video>
              <br />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',

                  alignItems: 'center',
                }}
              >
                <Typography color="text.secondary" style={{ marginRight: '35%' }}>
                  {video?.views} просмотров |{' '}
                  {video &&
                    formatDistanceToNow(new Date(video?.createdAt), {
                      addSuffix: true,
                      locale: ru,
                    })}
                </Typography>
                {video?.Likes.length}
                {video?.Likes.find((el) => el.userId === user.id)?
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => dispatch(setLikeThunk({ videoId, userId }))}
                >
                  <FavoriteIcon />
                </IconButton>
                :
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => dispatch(setLikeThunk({ videoId, userId }))}
                >
                  <FavoriteBorderIcon />
                </IconButton>
                }
                <Button>Create your Room +</Button>
              </div>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography>{video && video.Channel.name}</Typography>
                    <Typography color="text.secondary">
                      {video && video.Channel.Subscriptions.length} subscribers
                    </Typography>
                  </ListItemText>
                  {user.id !== video?.channelId && (
                    <Button
                      style={{ marginRight: '-147%' }}
                      variant="contained"
                      onClick={() => {
                        if (user.status === 'logged') {
                          void dispatch(addSubThunk({ userId, channelId }));
                        }
                      }}
                    >
                      Подписаться
                    </Button>
                  )}
                </ListItem>
              </div>
              <Divider />
              <div style={{ width: '100%' }}>
                <Accordion style={{ width: '100%' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Read Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{video && video.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </CardContent>
            <Comments />
          </Card>
        </div>
      </Stack>
    </div>
  );
}
