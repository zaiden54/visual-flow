import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setVideos } from '../../redux/slices/channel/channelSlice';
import { swapModal } from '../../redux/slices/modals/modalSlice';
import apiService from '../../services/config';

export default function ModalWindow(): JSX.Element {
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const channel = useAppSelector((state) => state.channel);
  const user = useAppSelector((state) => state.user.data);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const fileData = Object.fromEntries(new FormData(e.currentTarget));

    apiService
      .post('/upload/video', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => dispatch(setVideos(data)))
      .catch((err) => Promise.reject(err));

    dispatch(swapModal({ value: false }));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modal.value}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Добавьте видео
        </Typography>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            submitHandler(e);
            // void dispatch(getChannelThunk(user.id));
          }}
        >
          <TextField
            type="text"
            name="title"
            id="outlined-basic"
            label="Название"
            variant="outlined"
          />
          <TextField
            type="text"
            name="description"
            id="outlined-basic"
            label="Описание"
            variant="outlined"
          />
          <TextField type="file" name="video" id="outlined-basic" variant="outlined" />
          <TextField type="file" name="preview" id="outlined-basic" variant="outlined" />
          {/* <input type="text" name="title" placeholder="Введите название видео" />
          <input type="text" name="description" placeholder="Введите описание" />
          <input type="file" name="video" /> */}
          <Button type="submit">Добавить</Button>
        </form>
        <Button type="button" onClick={() => dispatch(swapModal({ value: false }))}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
