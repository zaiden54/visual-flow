import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import Subscribes from './Subscribes';
import {
  getSubChannelThunk,
  getFirstSubChannelThunk,
} from '../../redux/slices/subChannels/subChannelsThunk';

const drawerWidth = 240;
const users = ['Remy', 'Jane', 'Hannah'];

export default function MenuLeft(): JSX.Element {
  const channelsAndVideos = useAppSelector((state) => state.videos);
  const dispatch = useAppDispatch();
  const subs = useAppSelector((state) => state.subs);
  // const [count,setCount]=useState(0)
  // const subs = useAppSelector((state)=>state.subs.row)

  const user = useAppSelector((store) => store.user);

  // useEffect(() => {
  //   if (user.data.status === 'logged') {
  //     void dispatch(getFirstSubChannelThunk(0));
  //   }
  // }, [user]);

  // console.log(subs.rows);

  // const remain = useAppSelector((state)=>state.subs.count)
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', zIndex: 0 },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/rooms">
            <ListItem key={1} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Rooms" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/subs">
            <ListItem key={2} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AutoAwesomeMotionIcon />
                </ListItemIcon>
                <ListItemText primary="Subscribes" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/mostViewed">
            <ListItem key={3} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LeaderboardIcon />
                </ListItemIcon>
                <ListItemText primary="Most viewed" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          {subs.rows && (
            <List>
              {subs.rows.map((el) => (
                <ListItem key={el.id} disablePadding>
                  <ListItemButton>
                    <Subscribes name={el.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              {/* <ListItemButton> */}
              <Button
                type="button"
                onClick={() => void dispatch(getSubChannelThunk(subs.rows.length))}
              >
                {' '}
                more
              </Button>
              {/* </ListItemButton> */}
            </List>
          )}
          {/* <List>
            <ListItem key={4} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemText primary="Subscribes" />
            </ListItem>
            {channelsAndVideos.map((el) => (
              <ListItem key={el.name} disablePadding>
                <ListItemButton>
                  <Subscribes name={el.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
          {/* <List>
            {subs.rows.map((el) => (
              <ListItem key={el} disablePadding>
                <ListItemButton>
                  <Subscribes name={el.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton
              type="button"
              onClick={() => dispatch(getSubChannelThunk(subs.rows.length - 1))}
            >
              {' '}
              more
            </ListItemButton>
          </List> */}
        </List>
      </Box>
    </Drawer>
  );
}
