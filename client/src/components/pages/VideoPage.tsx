import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import React, { ReactEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../ui/Comments';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';

export default function VideoPage(): JSX.Element {
  const { link } = useParams();

  const likeHandler = (e) => {
    // const data = {req.session.userId, }
    axios.patch('/api/like', )
  }

  return (
    <div>
      <MenuLeft />
      <NavBar />
      <Stack
        style={{ marginTop: 90, display: 'flex', alignContent: 'center', zIndex: -3 }}
        spacing={1}
      >
        <div>
          <Card style={{ marginTop: 0 }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              {/* <Skeleton variant="rounded" width={910} height={500} style={{alignSelf: 'center'}}/> */}
              <video
                id="videoPlayer"
                style={{ alignSelf: 'center' }}
                width={910}
                height={500}
                controls
                // eslint-disable-next-line react/jsx-boolean-value
                muted={true}
                autoPlay
              >
                {link && <source src={`http://localhost:3001/api/watch/${link}`} />}
              </video>
<br />
<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Typography color="text.secondary" style={{marginRight: '35%'}}>
                54623754 просмотров | опубликовано когда-то
              </Typography>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <FavoriteBorderIcon />
        </IconButton>
  <Button>Create your Room +</Button>
              </div>
              <Divider/>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography>Ali Connors</Typography>
                    <Typography color="text.secondary">54623754 subscribers</Typography>
                  </ListItemText>
                  <Button style={{ marginRight: '-147%' }} variant="contained">
                    Подписаться
                  </Button>
                </ListItem>
              </div>
              <Divider/>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Read Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                      lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </CardContent>
        < Comments />
          </Card>
        </div>
      </Stack>
    </div>
  );
}
