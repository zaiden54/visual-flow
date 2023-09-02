import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

export default function AddMessageForm(): JSX.Element {
  return (
    <Box component="form" display="flex" flexDirection="row" alignItems="baseline">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
        <TextField sx={{ m: 2 }} variant="outlined" name="message" label="Message" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
        <Button variant="contained" type="submit">
          Send
        </Button>
      </div>
    </Box>
  );
}
