import type React from 'react';
import { useAppDispatch } from './reduxHooks';
import type { CommentFormType  } from '../../types/videotypes';
import createCommentThunk from '../slices/video/commentThunk';

const useComments = (): {
    addNewCommentHandler: (event: React.FormEvent<HTMLFormElement>, link: string) => void;
} => {
    const dispatch = useAppDispatch();
    const addNewCommentHandler = (event: React.FormEvent<HTMLFormElement>, link: string): void => {
 event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as CommentFormType
void dispatch(createCommentThunk({link, formData}));
event.currentTarget.reset();
}

return {
    addNewCommentHandler
};
};

export default useComments