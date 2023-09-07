import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setVideos } from '../../redux/slices/channel/channelSlice';
import { swapEditModal } from '../../redux/slices/modals/modalSlice';
import apiService from '../../services/config';
import { updateVideoThunk } from '../../redux/slices/video/videoThunk';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function EditModalWindow(): JSX.Element {

  const editModal = useAppSelector((state) => state.editModal);
  // console.log(editModal.video)
  const dispatch = useAppDispatch();

  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')

  const inputControlDesc = (e) => {
    setDesc(e.currentTarget.value)
  }

  const inputControlTitle = (e) => {
    setTitle(e.currentTarget.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    // console.log(formData)
    void dispatch(updateVideoThunk({newTitle: formData.title, newDesc: formData.description, videoId: editModal.video.id}))
    dispatch(swapEditModal({ value: false }))
  }

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
      <Box sx={style} style={{ display: 'flex', flexDirection: 'column', }}>
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
            style={{marginTop:'10px'}}
            defaultValue={editModal?.video?.title}
          />
          <TextField
            onChange={inputControlTitle}
            type="text"
            name="description"
            id="outlined-basic"
            label="Описание"
            variant="outlined"
            style={{marginTop:'10px'}}
            defaultValue={editModal?.video?.description}
          />
          <Button type="submit" 
          // onClick={() => dispatch(swapEditModal({ value: false }))}
          >Сохранить</Button>
        </form>
        <Button type="button" onClick={() => dispatch(swapEditModal({ value: false }))}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
