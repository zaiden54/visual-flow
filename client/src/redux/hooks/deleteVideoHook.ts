import React from 'react';
import { useAppDispatch } from './reduxHooks';
import { deleteVideoThunk } from '../slices/channel/channelThunk';
import { VideoType } from '../../types/videotypes';
import { afterDeleteVideos } from '../slices/channel/channelSlice';

const useDeleteVideo = (): {
deleteVideoHandler: (event: React.MouseEvent<HTMLButtonElement> , videoId: number) => void;
    } => {
    const dispatch = useAppDispatch();
    const deleteVideoHandler = (event: React.MouseEvent<HTMLButtonElement>, videoId: number): void => {
        event.preventDefault();
      void dispatch(deleteVideoThunk(videoId))
      void dispatch(afterDeleteVideos)
        } 
    return {
        deleteVideoHandler
    }
}

export default useDeleteVideo