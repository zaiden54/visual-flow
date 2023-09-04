import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CommentType } from '../../../types/commentType'
import {getCommentService} from '../../../services/commentService';

const getAllCommentsVideoThunk = createAsyncThunk<CommentType[]>(
  '/link',
  async (link)=>
  getCommentService(link)
  .then((data) => data)
.catch(console.log)
);


export default getAllCommentsVideoThunk;