import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/reduxHooks';
import getAllCommentsVideoThunk from '../../redux/slices/video/commentThunk';
import useComments from '../../redux/hooks/commentHooks';
import CommentItem from './CommentItem'

export default function Comments(): JSX.Element {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.comments);

  const link = useParams();
  const [currentComments, setCurrentComments] = useState([]);
  useEffect(() => {
    void dispatch(getAllCommentsVideoThunk(link));
  }, []);
  
  const { addNewCommentHandler } = useComments();
  

  return (
    <div style={{marginLeft: '5%'}} >
      <Typography variant="subtitle1">Add a comment: </Typography>
    <Box component="form" style={{ display: 'flex', flexDirection: 'row' }} sx={{ width: '100%'}} onSubmit={addNewCommentHandler}>
            <TextField
              id="outlined-basic"
              sx={{ width:'85%', height: 40 }}
              variant="outlined"
              size="small"
              name="message"
            />
            <Button variant="outlined" style={{ height: 40, marginRight: '5%' }} type="submit">
              Comment
            </Button>
          </Box>
          {comments?.map((comment) => {
<>
      < CommentItem comment={comment} />
    <Divider variant="inset" component="li" sx={{ width: '100%'}} />
    </>
        })}
    </div>
  );
}