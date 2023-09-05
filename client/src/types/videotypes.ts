export type VideoType = {
  id: number;
  title: string;
  description: string;
  channelId: number;
  views: number;
  createdAt: string;
  preview: string;
  link: string;
  Channel: ChannelType;
};

export type SubscriptionsType = {
  id: number;
  userId: number;
  channelId: number;
  Channel: ChannelType;
};

export type ChannelType = {
  id: number;
  name: string;
  userId: number;
  Videos: VideoType[];
  createdAt: string;
  Subscriptions: SubscriptionsType[];
};

export type VideoPageType = WatchType | null;

export type WatchType = {
  id: number;
  title: string;
  description: string;
  channelId: number;
  views: number;
  createdAt: string;
  preview: string;
  link: string;
  Channel: WatchChannelType;
  Likes: LikesType[];
  Comments: CommentsType[];
};

export type WatchChannelType = {
  id: number;
  name: string;
  userId: number;
  Subscriptions: SubscriptionsType[];
};

export type ChannelSubscription = {
  id: 1;
  userId: 1;
  channelId: 2;
};

export type LikesType = {
  id: number;
  userId: number;
  videoId: number;
};

export type CommentsType = {
  id: number;
  userId: number;
  videoId: number;
  message: string;
  Users: {
    name: string;
  };
};
