export type CommentType = {
    id: number;
    userId: number;
    videoId: number;
    message: string
  };

  export type CommentFormType = {
    comment: string;
  }