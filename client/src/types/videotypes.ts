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

export type ChannelType = {
  id: number;
  name: string;
  userId: number;
  Videos: VideoType[];
  createdAt: string;
};
