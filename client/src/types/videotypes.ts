export type VideoType = {
  title: string;
  description: string;
  channelId: number;
  views: number;
  createdAt: string;
  preview: string;
  Channel: ChannelType;
};

export type ChannelType = {
  id: number;
  name: string;
  userId: number;
  Videos: VideoType[];
  createdAt: string;
};

// export type VideosFromBackType = {
//   Videos: VideoType[];
//   name: string;
//   createdAt: string;
// };
