import type { UserType } from './userTypes';

export type MessageType = {
  id: number;
  text: string;
  User: UserType;
};
