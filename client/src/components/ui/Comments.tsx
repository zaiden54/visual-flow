import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../redux/hooks/reduxHooks';

export default function Comments(): JSX.Element {
  const video = useAppSelector((state) => state.currentVideo);

  return (
    <div style={{ marginLeft: '5%' }}>
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
          <List sx={{ width: '100%' }}>
        {video?.Comments.map((el) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary={`${el.Users.name}`}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" color="text.secondary">
                    {el.message}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ width: '100%' }} />
          </>
        ))}
      </List>
    </div>
  );
}
