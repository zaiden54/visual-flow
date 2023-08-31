import Drawer from '@mui/material/Drawer';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Divider } from '@mui/material';
import Subscribes from './Subscribes';
import { useAppSelector } from '../../redux/hooks/reduxHooks';

const drawerWidth = 240;
const users = ['Remy', 'Jane', 'Hannah'];

export default function MenuLeft(): JSX.Element {
  const channelsAndVideos= useAppSelector((state)=>state.videos)
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',zIndex:0 },
      }}
    >
      <Toolbar />
      <Box 
      sx={{ overflow: 'auto' }}
      >
        <List>
          <ListItem key={1} style={{padding:'1px',alignItems:'center'}} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItemButton>
          </ListItem>
          <ListItem key={2} style={{padding:'1px',alignItems:'center'}} disablePadding>
            <ListItemButton href='/subs'>
              <ListItemIcon>
                <AutoAwesomeMotionIcon />
              </ListItemIcon>
              <ListItemText primary="Subscribes" />
            </ListItemButton>
          </ListItem>
          <ListItem key={3} style={{padding:'1px',alignItems:'center'}} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Most viewed" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            {channelsAndVideos.map((el) => (
              <ListItem key={el.name} disablePadding>
                <ListItemButton>
                  <Subscribes name={el.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </List>
      </Box>
    </Drawer>
  );
}
