import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



type SubscribeProps = {
  name: string;
};

export default function Subscribes({ name }: SubscribeProps): JSX.Element {
  return (
    <Stack direction="row" spacing={2} style={{padding:'1px',alignItems:'center'}}>
      <Avatar alt={name} src="#" />
      <Stack direction="column">{name}</Stack>
    </Stack>
  );
}
