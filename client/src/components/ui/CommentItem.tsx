import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import type { CommentType } from '../../types/commentType'

type CommentItemPropsType = {
    comment: CommentType
    }

export default function CommentItem({comment}: CommentItemPropsType): JSX.Element {
  return (
<>
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
            {comment}
              </Typography>
          }
        />
      </ListItem>
    <Divider variant="inset" component="li" sx={{ width: '100%'}} />
    </>
  )
}
