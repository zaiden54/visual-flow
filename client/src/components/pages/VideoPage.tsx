/* eslint-disable react/jsx-boolean-value */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
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
import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import createRoomThunk from '../../redux/slices/rooms/roomThunk';
import { addSubThunk } from '../../redux/slices/subs/subThunk';
import { getWatchThunk, reportThunk, setLikeThunk } from '../../redux/slices/video/watchThunk';
import apiService from '../../services/config';
import Comments from '../ui/Comments';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';

export default function VideoPage(): JSX.Element {
  const [start, _setStart] = useState(Date.now());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const user = useAppSelector((state) => state.user);
  const video = useAppSelector((state) => state.currentVideo);

  useEffect(() => {
    return () => {
      if (Date.now() - start > 15 * 1000 && video) {
        apiService.put(`/watch/${video?.link}`).catch((err) => console.error(err));
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  const { link } = useParams();

  useEffect(() => {
    if (link) {
      void dispatch(getWatchThunk(link));
    }
  }, []);

  return (
    <div style={{ display: 'flex', width: '70%', justifyContent: 'center', marginBottom: '20px' }}>
      <MenuLeft />
      <NavBar />
      <Stack
        style={{
          marginTop: 90,
          display: 'flex',
          alignContent: 'center',
          zIndex: 1,
          flexWrap: 'wrap',
          width: '100%',
        }}
        spacing={1}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Card style={{ marginTop: 0, width: '100%', justifyContent: 'center' }}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flexWrap: 'wrap',
              }}
            >
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
                <h4 style={{ wordWrap: 'break-word', marginLeft: '20px' }}>{video?.title}</h4>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'baseline',

                    justifyContent: 'end',
                    width: '40%',
                  }}
                >
                  <div style={{ alignItems: 'center', display: 'flex', marginRight: '5%' }}>
                    {video?.Likes?.find((el) => el.userId === user.data.id) ? (
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          void dispatch(setLikeThunk({ videoId: video!.id, userId: user.data.id }));
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          void dispatch(setLikeThunk({ videoId: video!.id, userId: user.data.id }));
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    )}
                    {video?.Likes?.length}
                  </div>
                  <Button
                    onClick={() => {
                      if (video) {
                        void dispatch(createRoomThunk(video));
                      }
                    }}
                  >
                    Создать комнату +
                  </Button>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        style={{ width: '150px' }}
                        onClick={() => {
                          void dispatch(reportThunk(video!.id));
                          handleClose();
                          enqueueSnackbar('Жалоба отправленна', { variant: 'warning' });
                        }}
                      >
                        Пожаловаться
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <ListItem>
                  <Link
                    to={`/channel/${video?.Channel?.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={video?.Channel?.name} src="#" />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography>{video && video?.Channel?.name}</Typography>
                      {video?.Channel?.name === 'Marie Poplavskaya' ? (
                        <Typography color="text.secondary">101 348 подписчиков</Typography>
                      ) : (
                        <Typography color="text.secondary">
                          {video && video?.Channel?.Subscriptions.length} подписчиков
                        </Typography>
                      )}
                    </ListItemText>
                  </Link>
                  {user.data.id !== video?.channelId ? (
                    <Button
                      style={{ width: '100px', height: '30px', fontSize: '11px' }}
                      variant="contained"
                      onClick={() => {
                        if (user.status === 'logged') {
                          void dispatch(
                            addSubThunk({ userId: user.data.id, channelId: video!.Channel?.id }),
                          );
                        }
                      }}
                    >
                      {video?.Channel?.Subscriptions.find((el) => el.userId === user.data.id)
                        ? 'Отписаться'
                        : 'Подписаться'}
                    </Button>
                  ) : (
                    false
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography color="text.secondary">
                        {video?.views} просмотров |{' '}
                        {video?.createdAt &&
                          formatDistanceToNow(new Date(video?.createdAt), {
                            addSuffix: true,
                            locale: ru,
                          })}
                      </Typography>
                      <Typography>Смотреть описание</Typography>
                    </div>
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
