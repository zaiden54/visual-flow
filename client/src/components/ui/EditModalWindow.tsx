import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { swapEditModal } from '../../redux/slices/modals/modalSlice';
import { updateVideoThunk } from '../../redux/slices/video/videoThunk';

export default function EditModalWindow(): JSX.Element {
  const editModal = useAppSelector((state) => state.editModal);
  const dispatch = useAppDispatch();

  const [_desc, setDesc] = useState('');
  const [_title, setTitle] = useState('');

  const inputControlDesc: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDesc(event.currentTarget.value);
  };

  const inputControlTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    void dispatch(
      updateVideoThunk({
        newTitle: formData.title.toString(),
        newDesc: formData.description.toString(),
        videoId: editModal!.video!.id.toString(),
      }),
    );

    dispatch(swapEditModal({ value: false }));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={editModal.value}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Редактирование
        </Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', margin: 3 }}
          onSubmit={submitHandler}
        >
          <TextField
            onChange={inputControlDesc}
            type="text"
            name="title"
            id="outlined-basic"
            label="Название"
            variant="outlined"
            style={{ marginTop: '10px' }}
            defaultValue={editModal?.video?.title}
          />
          <TextField
            onChange={inputControlTitle}
            type="text"
            name="description"
            id="outlined-basic"
            label="Описание"
            variant="outlined"
            style={{ marginTop: '10px' }}
            defaultValue={editModal?.video?.description}
          />
          <Button
            type="submit"
            // onClick={() => dispatch(swapEditModal({ value: false }))}
          >
            Сохранить
          </Button>
        </form>
        <Button type="button" onClick={() => dispatch(swapEditModal({ value: false }))}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
