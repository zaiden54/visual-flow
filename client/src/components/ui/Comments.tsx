import React, {useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../redux/hooks/reduxHooks';
import useComments from '../../redux/hooks/commentHooks';

export default function Comments(): JSX.Element {
  const video = useAppSelector((state) => state.currentVideo);
  // const comments = useAppSelector((state => state.currentVideo.co))
  const {addNewCommentHandler} = useComments();
  console.log(video?.Comments);
  
  return (
    <div style={{ marginLeft: '5%' }}>
      <Typography variant="subtitle1">Add a comment: </Typography>
    <Box component="form" onSubmit={(e) => addNewCommentHandler(e, video?.link)} style={{ display: 'flex', flexDirection: 'row' }} sx={{ width: '100%'}}>
            <TextField
              id="outlined-basic"
              sx={{ width:'85%', height: 40 }}
              variant="outlined"
              size="small"
              name="message"
            />
            <Button variant="outlined" style={{ height: 40, marginRight: '5%' }} type="submit">
              Comment
            </Button>
          </Box>
          <List sx={{ width: '100%' }}>
        {video?.Comments?.map((el) => (
          <div key={el.id} >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`${el.User.name}`} src="" />
                {/* /static/images/avatar/1.jpg */}
              </ListItemAvatar>
              <ListItemText
                primary={`${el.User.name}`}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" color="text.secondary">
                    {el.message}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ width: '100%' }} />
          </div>
        ))}
      </List>
    </div>
  );
}
