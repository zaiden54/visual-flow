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
import {
  getFirstSubChannelThunk,
  getSubChannelThunk,
} from '../../redux/slices/subChannels/subChannelsThunk';
import Subscribes from './Subscribes';

const drawerWidth = 240;

export default function MenuLeft(): JSX.Element {
  const dispatch = useAppDispatch();
  const subs = useAppSelector((state) => state.subs);

  const user = useAppSelector((store) => store.user);

  const [clicked, setClick] = useState(false);

  useEffect(() => {
    if (user.status === 'logged') {
      void dispatch(getFirstSubChannelThunk(0));
    }
  }, [user]);

  useEffect(() => {
    if (clicked) {
      void dispatch(getFirstSubChannelThunk(0));
    }
  }, [clicked]);

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
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/filler">
            <ListItem key={1} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Комнаты" />
              </ListItemButton>
            </ListItem>
          </Link>
          {user.status === 'logged' && (
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/subs">
              <ListItem key={2} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon>
                    <AutoAwesomeMotionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Подписки" />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/popular">
            <ListItem key={3} style={{ padding: '1px', alignItems: 'center' }} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon>
                  <LeaderboardIcon />
                </ListItemIcon>
                <ListItemText primary="Популярное" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          {user.status === 'logged' && (
            <div>
              {subs.rows && (
                <List
                  style={{
                    justifyContent: 'center',

                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {subs.rows.map((el) => (
                    <Link
                      key={el.id}
                      to={`/channel/${el.id}`}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <ListItem key={el.id} disablePadding>
                        <ListItemButton>
                          <Subscribes key={el.id} name={el.name} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                  {subs.count - subs.rows.length > 0 ? (
                    <Button
                      style={{ marginTop: 2 }}
                      type="button"
                      onClick={() => {
                        setClick(false);
                        void dispatch(getSubChannelThunk(subs.rows.length));
                      }}
                    >
                      {subs.count - subs.rows.length} more
                    </Button>
                  ) : (
                    subs.rows.length > 3 && (
                      <Button
                        style={{ marginTop: 2 }}
                        type="button"
                        onClick={() => {
                          void dispatch(getSubChannelThunk(subs.rows.length));
                          setClick(true);
                        }}
                      >
                        hide
                      </Button>
                    )
                  )}
                </List>
              )}
            </div>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
