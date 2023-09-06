export type RoomType = {
  id: number;
  title: string;
  roomLink: string;
  type: string;
  maxPeople: number;
  videoId: number;
  createdAt: Date;
};

export type RoomListType = {
  id: number;
  title: string;
  roomLink: string;
  type: string;
  maxPeople: number;
  videoId: number;
  createdAt: Date;
  
}

export type RoomsSliceType = RoomType[];
