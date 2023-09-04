import React from 'react';
import { commentCreateService } from '../../services/commentService';
import { useAppDispatch } from './reduxHooks';
import { commentCreate } from '../slices/video/commentSlice';
import type { CommentFormType, CommentType } from '../../types/commentType';

const useComments = (): {
addNewCommentHandler: (event: React.FormEvent<HTMLFormElement>) => void;
} => {
const dispatch = useAppDispatch();
const addNewCommentHandler = (event: React.FormEvent<HTMLFormElement>): void => {
event.preventDefault();
const formData = Object.fromEntries(new FormData(event.currentTarget)) as CommentFormType
commentCreateService(formData)
.then((data) => dispatch(commentCreate(data)))
.catch(() => console.log())
event.currentTarget.reset();
}

return {
    addNewCommentHandler
};
};

export default useComments