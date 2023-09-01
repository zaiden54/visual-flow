import { Subscription } from 'react-redux';
import type { ChannelType } from './videotypes';

export type SubType = {
  rows: ChannelType[];
  count: number;
};
