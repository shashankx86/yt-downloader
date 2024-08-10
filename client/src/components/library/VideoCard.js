import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function VideoCard(props) {

  if (!props.data) {
    return false;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={props.data.thumbnailUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.mp3DownloadRequest()}>Download MP3</Button>
        <Button size="small">Download Video</Button>
      </CardActions>
    </Card>
  );
}
