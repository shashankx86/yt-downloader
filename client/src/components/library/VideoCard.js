import * as React from 'react';
import {Card, CardContent, CardMedia, Button, Typography, Box, FormHelperText, FormControl, FormControlLabel, Checkbox} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {RotateRight, CloudDownload} from '@mui/icons-material';
export default function VideoCard(props) {

  if (!props.data) {
    return false;
  }

  function DownloadButton(props) {
    if (!props.downloadUrl) return false;

    return (
      <Button  href={props.downloadUrl} target="_blank" size="small" startIcon={<CloudDownload />}>
        Download Audio
      </Button>
    )
  }

  const getDescription = description => {
    if (!description || description && !description.length) {
      return "Description not available";
    }

    return description.length > 500 
      ? description.slice(0, 500)+'...' 
      : description;
  }

  function AudioFormatsSelect(props) {
    if(!props.formats)
      return false;
    
    const defaultBitrate = Math.max(...props.formats.map(format => format.audioBitrate));
    return (
      <FormControl fullWidth>
        <InputLabel id="format-selection-label">Select Format</InputLabel>
        <Select labelId="format-selection-label" 
          id="format-selection" label="Select format"
          value={ props.audioBitrate || defaultBitrate}
          onChange={e => props.onChange(e.target.value)}
        >
        {props.formats.map(format => {
          return (
            <MenuItem 
              value={format.audioBitrate} 
              key={'format'+format.averageBitrate}
            >
              {format.container} {format.audioBitrate} KBPS
            </MenuItem>
          )
        })}
        </Select>
        <FormHelperText>If no format selected, highest quality format will be used</FormHelperText>        
      </FormControl>
    )
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{flexGrow: 1, flexBasis: 0}}
        image={props.data.thumbnailUrl}
        alt={props.data.title}
      />
      <Box sx={{flexDirection: 'column', flexGrow: 2, flexBasis: 0}}>
        <CardContent>
          <Typography component="div" variant="h5">
            {props.data.title}
          </Typography>
          <Typography component="div" sx={{marginTop: 2, mb: 2}}>
            <AudioFormatsSelect formats={props.data.formats} onChange={props.selectFormat}  audioBitrate={props.audioBitrate}/>
          </Typography>
          <Typography color="text.secondary" sx={{fontSize: "12px"}} component="div">
            {getDescription(props.data.description)}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <FormControlLabel control={<Checkbox checked={true} />} label="Convert to MP3" />
          <Button size="small" 
            onClick={() => props.mp3DownloadRequest()}  
            startIcon={<RotateRight />}>
              Download Audio
          </Button>
          <DownloadButton downloadUrl={props.downloadUrl}></DownloadButton>
        </Box>
      </Box>

    </Card>
  );
}
