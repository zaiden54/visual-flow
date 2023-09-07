import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { deleteVideoThunk, getChannelThunk } from '../../redux/slices/channel/channelThunk';
import CustomTabs from '../ui/CustomTabs';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideoCard from '../ui/VideoCard';
import { getAllReportedVideosThunk } from '../../redux/slices/video/videoThunk';

function a11yProps(index: number): JSX.Element {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChannelPage(): JSX.Element {
  const channel = useAppSelector((state) => state.channel);
  const user = useAppSelector((state) => state.user.data);

  const allReps = useAppSelector((state) => state.allReps);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getChannelThunk(id));
  }, [id]);

  useEffect(() => {
    void dispatch(getAllReportedVideosThunk());
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <>
      <MenuLeft />
      <NavBar />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginTop: '5rem',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            style={{
              padding: '1px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              width: '90%',
            }}
          >
            <Avatar alt={channel.name} sx={{ width: 56, height: 56 }} src="#" />
            <Stack direction="column">
              <Stack direction="column">{channel.name}</Stack>

              <Stack direction="row" spacing={2}>
                <Stack direction="column">{channel.Subscriptions?.length} подписчиков</Stack>
                <Stack direction="column">{channel.Videos?.length} видео</Stack>
              </Stack>
            </Stack>
          </Stack>
          {user.status === 'logged' && user.roleId === 1 && user.id === channel.userId ? (
            <>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab label="Мои видео" {...a11yProps(0)} />
                    <Tab label="Жалобы" {...a11yProps(1)} />
                  </Tabs>
                </Box>
              </Box>
              <CustomTabs value={value} index={0}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                  }}
                >
                  {channel?.Videos?.map((el) => (
                    <div key={el.id} style={{ display: 'flex', flexDirection: 'column' }}>
                      <VideoCard video={el} />
                      <Button
                        onClick={() => void dispatch(deleteVideoThunk(el.id))}
                        style={{ alignSelf: 'center' }}
                      >
                        {' '}
                        <DeleteOutlineIcon /> Удалить{' '}
                      </Button>{' '}
                    </div>
                  ))}
                </Box>
              </CustomTabs>
              <CustomTabs value={value} index={1}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                  }}
                >
                  {allReps.map((el) => (
                    <div key={el.id} style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                      Количество жалоб: {el.reportCount}
                      </Typography>
                      <VideoCard video={el.Video} />
                      <Button
                        onClick={() => void dispatch(deleteVideoThunk(el.videoId))}
                        style={{ alignSelf: 'center' }}
                      >
                        {' '}
                        <DeleteOutlineIcon /> Удалить{' '}
                      </Button>{' '}
                    </div>
                  ))}
                </Box>
              </CustomTabs>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              {channel?.Videos?.map((el) => (
                <div key={el.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <VideoCard video={el} />
                  {user.status === 'logged' && user.id === channel.userId && (
                    <Button
                      onClick={(e) => void dispatch(deleteVideoThunk(el.id))}
                      style={{ alignSelf: 'center' }}
                    >
                      {' '}
                      <DeleteOutlineIcon /> Удалить{' '}
                    </Button>
                  )}
                </div>
              ))}
            </Box>
          )}
        </div>
      </Box>
    </>
  );
}
