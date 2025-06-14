/* eslint-disable linebreak-style */
import {Typography} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
const FallBack = () => {
  return (
    <div className="fallback">
      <Typography variant="h2" className="emptyResponse">
        You are not signed Up! Kindly proceed by joining the club.
      </Typography>
      <Link to="/adminLogin" className="link">
        Home
      </Link>
    </div>
  );
};
export default FallBack;
