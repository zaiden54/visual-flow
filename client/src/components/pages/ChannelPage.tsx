import { Box, Card, Typography } from '@mui/material';
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
import VideoList from '../ui/VideoList';
import { addSubThunk } from '../../redux/slices/subs/subThunk';
import VideoCard from '../ui/VideoCard';
// import useDeleteVideo from '../../redux/hooks/deleteVideoHook';
// import useDeleteVide
import { getAllReportedVideosThunk } from '../../redux/slices/video/videoThunk';

function a11yProps(index: number): JSX.Element {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChannelPage(): JSX.Element {
  // const videos = useAppSelector((state) => state.videos);
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
  console.log('----------', allReps);

  // const { deleteVideoHandler } = useDeleteVideo();

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
            // backgroundColor:'red'
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
                <Stack direction="column">{channel.Subscriptions?.length} subscribers</Stack>
                <Stack direction="column">{channel.Videos?.length} videos</Stack>
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
                    <Tab label="My Videos" {...a11yProps(0)} />
                    <Tab label="Reports" {...a11yProps(1)} />
                  </Tabs>
                </Box>
              </Box>
              <CustomTabs value={value} index={0}>
                {/* <VideoList videos={channel?.Videos} />
                 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                  }}
                >
                  {/* <VideoList videos={channel?.Videos} /> */}
                  {channel?.Videos?.map((el) => (
                    <div key={el.id}>
                      <VideoCard video={el} />
                      <Button
                        onClick={() => void dispatch(deleteVideoThunk(el.id))}
                        style={{ alignSelf: 'center' }}
                      >
                        {' '}
                        huhu{' '}
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
                    <div key={el.id}>
                      <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                        {el.reportCount} report(s)
                      </Typography>
                      <VideoCard video={el.Video} />
                      <Button
                        onClick={() => void dispatch(deleteVideoThunk(el.videoId))}
                        style={{ alignSelf: 'center' }}
                      >
                        {' '}
                        huhu{' '}
                      </Button>{' '}
                    </div>
                  ))}
                </Box>
              </CustomTabs>
            </>
          ) : (
            // <VideoList videos={channel?.Videos} />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              {/* <VideoList videos={channel?.Videos} /> */}
              {channel?.Videos?.map((el) => (
                <div key={el.id}>
                  <VideoCard video={el} />
                  <Button
                    onClick={(e) => void dispatch(deleteVideoThunk(el.id))}
                    style={{ alignSelf: 'center' }}
                  >
                    {' '}
                    huhu{' '}
                  </Button>{' '}
                </div>
              ))}
            </Box>
          )}
        </div>
      </Box>
    </>
  );
}
