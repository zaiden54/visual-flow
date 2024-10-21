import React from 'react';
import RoomMessages from './RoomMessages';
import AddMessageForm from './AddMessageForm';

export default function RoomChat(): JSX.Element {
  return (
    <div>
      <RoomMessages />
      <AddMessageForm />
    </div>
  );
}
