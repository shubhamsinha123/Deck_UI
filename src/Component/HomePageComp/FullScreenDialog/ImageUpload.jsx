/* eslint-disable linebreak-style */
import {Typography, Slide, Dialog, AppBar, Toolbar, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import FileUpload from './FileUpload';
import PropTypes from 'prop-types';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// FIX
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = 'Transition';

const fileUploadProp = {
  accept: 'image/*',
  onChange: (event) => {
    if (event.target.files !== null && event.target?.files?.length > 0) {
      console.log(`Saving ${event.target.value}`);
    }
  },
  onDrop: (event) => {
    console.log(`Drop ${event.dataTransfer.files[0].name}`);
  }
};
const ImageUpload = ({open, handleClose}) => {
  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{position: 'relative'}} color="warning">
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="close" sx={{ml: 2, flex: 1}}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Typography variant="h2">Hola</Typography>
        {/* <hr /> */}
        <FileUpload {...fileUploadProp} />
      </Dialog>
    </>
  );
};
ImageUpload.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object
};
export default ImageUpload;
