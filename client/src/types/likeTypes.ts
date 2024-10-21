export type LikeType = {
  id: number;
  videoId: number;
  userId: number;
};

export type SetLikeThunkParams = {
  videoId: number;
  userId: number;
};
