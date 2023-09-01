import { Subscription } from 'react-redux';
import type { ChannelType } from './videotypes';

export type SubType = {
  row: [Subscription: ChannelType[]];
  count: number;
};
