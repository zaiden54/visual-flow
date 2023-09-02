import { Divider } from '@mui/material';
import React from 'react';
import type { MessageType } from '../../../types/chatTypes';
import Message from './Message';

const messages = [
  {
    id: 1,
    text: 'first message',
    User: {
      id: 1,
      name: 'DEN',
    },
  },
  {
    id: 2,
    text: 'second message',
    User: {
      id: 2,
      name: 'GERA',
    },
  },
  {
    id: 3,
    text: 'third message',
    User: {
      id: 3,
      name: 'GERMAN2',
    },
  },
  {
    id: 4,
    text: 'fourth message',
    User: {
      id: 4,
      name: 'GERMAN3',
    },
  },
  {
    id: 5,
    text: '5 message',
    User: {
      id: 5,
      name: 'GERMAN5',
    },
  },
  {
    id: 6,
    text: '6 message',
    User: {
      id: 6,
      name: 'GERMAN6',
    },
  },
];

type RoomMessagesPropsType = {
  messages: MessageType[];
};

export default function RoomMessages(): JSX.Element {
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((el: MessageType) => (
        <>
          <Message message={el} />
          <Divider variant="inset" />
        </>
      ))}
    </div>
  );
}
