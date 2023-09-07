import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import React from 'react';
import useComments from '../../redux/hooks/commentHooks';
import { useAppSelector } from '../../redux/hooks/reduxHooks';

export default function Comments(): JSX.Element {
  const video = useAppSelector((state) => state.currentVideo);
  const {addNewCommentHandler} = useComments();
  
  return (
    <div style={{ marginLeft: '5%' }}>
      <Typography variant="subtitle1">Написать комментарий: </Typography>
    <Box component="form" onSubmit={(e) => addNewCommentHandler(e, video?.link)} style={{ display: 'flex', flexDirection: 'row', marginBottom: '3%' }} sx={{ width: '100%'}}>
            <TextField
              id="outlined-basic"
              sx={{ width:'88%', height: 40 }}
              variant="outlined"
              size="small"
              name="message"
            />
            <Button variant="outlined" style={{ height: 40, marginRight: '5%' }} type="submit">
              <AddCommentIcon />
            </Button>
          </Box>
          <List 
          sx={{ height: '400px', overflow: 'auto'}}
          >
        {video?.Comments?.map((el) => (
          <div key={el.id} style={{ display:'flex', flexWrap:'wrap', flexDirection:'column', width:"100%" }} >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`${el.User.name}`} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={`${el.User.name}`}
                secondary={
                  <Typography sx={{ display: 'inline', wordWrap: 'break-word', overflow: 'hidden'}} component="span" color="text.secondary">
                    {el.message}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ width: '93%' }} />
          </div>
        ))}
      </List>
    </div>
  );
}
