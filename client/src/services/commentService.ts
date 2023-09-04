import type { CommentType } from '../types/commentType';
import apiService from './config';

export const getCommentService = (link: string): Promise<CommentType[]> => apiService
    .get(`/videos/${link}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err))

export const commentCreateService = (link: string): Promise<CommentType> =>
    apiService
         .post<CommentType>(`/videos/${link}`)
         .then(({ data }) => data)
         .catch((err) => Promise.reject(err));