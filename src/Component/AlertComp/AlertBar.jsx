/* eslint-disable linebreak-style */
import {Alert, Snackbar} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
const AlertBar = ({status, setStatus, alertOpen, setAlertOpen}) => {
  const handleSbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  return (
    <>
      {status?.message && (
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          open={alertOpen}
          onClose={handleSbarClose}
        >
          <Alert variant="filled" onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
            {status.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
AlertBar.propTypes = {
  status: PropTypes.object,
  setStatus: PropTypes.func,
  alertOpen: PropTypes.bool,
  setAlertOpen: PropTypes.func
};
export default AlertBar;
