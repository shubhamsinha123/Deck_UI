/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grow} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// import {FullScreenDialog} from '../FullScreenDialog/Dialog';
import ImageUpload from '../FullScreenDialog/ImageUpload';

const bull = (
  <Box component="span" sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}>
    •
  </Box>
);

export const OutlinedCard = () => {
  const checked = true;
  // const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const card = (meaning, meaning2) => (
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          {meaning}
          <br />
          {meaning2}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenDialog}>
          Learn More
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className="mainCard">
            {/* <Zoom */}
            {/* <Fade */}
            <Grow in={checked} style={{transformOrigin: '0 0 0'}} {...(checked ? {timeout: 5000} : {})}>
              <Card variant="outlined" className="cardShadow">
                {card('well meaning and kindly.', '"a benevolent smile"')}
              </Card>
              {/* </Fade> */}
            </Grow>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="mainCard">
            <Grow in={checked} style={{transformOrigin: '0 0 0'}} {...(checked ? {timeout: 5000} : {})}>
              <Card variant="outlined" className="cardShadow">
                {card('demo2.', '"demo2"')}
              </Card>
              {/* </Fade> */}
            </Grow>
            {/* </Zoom> */}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="mainCard">
            <Grow in={checked} style={{transformOrigin: '0 0 0'}} {...(checked ? {timeout: 5000} : {})}>
              <Card variant="outlined" className="cardShadow">
                {card('demo3.', '"demo3"')}
              </Card>
              {/* </Fade> */}
            </Grow>
            {/* </Zoom> */}
          </Box>
        </Grid>
      </Grid>
      {open && (
        <ImageUpload open={open} handleClose={handleClose} data={card} />
        // <FullScreenDialog open={open} handleClose={handleClose}
        // data={card} />
      )}
    </>
  );
};
