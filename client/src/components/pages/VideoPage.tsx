import React from 'react'
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

export default function VideoPage():JSX.Element {
  return (
    <div>
 <MenuLeft />
 <NavBar />
 <div style={{display:'flex', flexDirection:'column'}}>
 <Card>
      <CardContent>
      <div style={{display:'flex', flexDirection:'column', alignContent: 'center'}}>
 <Stack style={{marginTop: 90}} spacing={1}>
      <Skeleton variant="rounded" width={910} height={500} />
    </Stack>
 </div>
        <Typography  style={{marginTop: 30}} variant="h5" component="div">
         видевоооооооооооооо
        </Typography>
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
              <Button style={{justifyContent: 'end'}} variant="contained">Подписаться</Button>
            </ListItemText>
      </ListItem>
      </div>
      <Divider variant="inset" />
      <Typography color="text.secondary">
          54623754 просмотров
        </Typography>
        <Typography color="text.secondary">
          опубликовано когда-то
        </Typography>
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
      </CardContent>
    </Card>
    </div>
    </div>
  )
}

