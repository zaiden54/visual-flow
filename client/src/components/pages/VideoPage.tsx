import React from 'react'
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuLeft from '../ui/MenuLeft'
import NavBar from '../ui/NavBar'
import Comments from '../ui/Comments';
import { useParams } from 'react-router-dom';

export default function VideoPage():JSX.Element {
  const { link } = useParams();
  return (
    <div >
 <MenuLeft />
 <NavBar />
 <Stack style={{marginTop: 90, display:'flex', alignContent: 'center', zIndex:-3}} spacing={1} >
 <div >
 <Card style={{marginTop: 0}}>
      <CardContent style={{display:'flex', flexDirection:'column', alignItems: 'start'}}>
      {/* <Skeleton variant="rounded" width={910} height={500} style={{alignSelf: 'center'}}/> */}
      <video id="videoPlayer"  style={{alignSelf: 'center'}} 
      // width="650px" 
      width={910} height={500}
      controls muted="muted" autoPlay>
        {link && <source src={`http://localhost:3001/api/watch/${link}`} />}
      </video>
       <Typography color="text.secondary">
          54623754 просмотров | опубликовано когда-то
        </Typography>
        <Divider variant="inset" />
        <div style={{display:'flex', flexDirection:'row'}} >
        <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText>
              <Typography>
                Ali Connors
              </Typography>
              <Typography color="text.secondary">
          54623754 subscribers
        </Typography>
            </ListItemText>
              <Button style={{marginRight: '-147%'}} variant="contained">Подписаться</Button>
      </ListItem>
      </div>
      <Divider variant="inset" />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    <Comments />
      </CardContent>
    </Card>
    </div>
          </Stack>
    </div>
  )
}

