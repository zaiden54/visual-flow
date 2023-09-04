import React, { useEffect } from 'react';
import RoomMessages from './RoomMessages';
import AddMessageForm from './AddMessageForm';

// const ws = new WebSocket('ws://localhost:3000');

export default function RoomChat(): JSX.Element {
  // useEffect(() => {
  //   ws.addEventListener('message', (e) => {
  //     console.log(e);
  //   });
  // }, []);

  return (
    <div>
      <RoomMessages />
      <AddMessageForm />
    </div>
  );
}
