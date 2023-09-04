import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function Comments(): JSX.Element {
  
  return (
    <div style={{marginLeft: '5%'}}>
      <Typography variant="subtitle1">Add a comment: </Typography>
    <Box component="form" style={{ display: 'flex', flexDirection: 'row' }} sx={{ width: '100%'}}>
            <TextField
              id="outlined-basic"
              sx={{ width:'85%', height: 40 }}
              variant="outlined"
              size="small"

            />
            <Button variant="outlined" style={{ height: 40, marginRight: '5%' }} type="submit">
              Comment
            </Button>
          </Box>
    <List sx={{ width: '100%'}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="User name"
          secondary={
               <Typography sx={{ display: 'inline' }}
                component="span"
                color="text.secondary">
            I'll be in your neighborhood doing errands this…
              </Typography>
          }
        />
      </ListItem>
    <Divider variant="inset" component="li" sx={{ width: '100%'}} />
    </List>
    </div>
  );
}