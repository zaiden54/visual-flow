import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import type { MessageType } from '../../../types/chatTypes';

export type MessagePropsType = {
  message: MessageType;
};
export default function Message({ message }: MessagePropsType) {
  if (message.User.status !== 'logged') return;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={message.User.name} src="#" />
      </ListItemAvatar>
      <ListItemText primary={message.User.name} secondary={message.text} />
    </ListItem>
  );
}
