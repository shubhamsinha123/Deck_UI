/* eslint-disable linebreak-style */
import {Typography} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
const MenuFallBack = () => {
  return (
    <div className="fallback">
      <Typography variant="h2">
        <AcUnitIcon fontSize="large" />
        You are not Logged! Kindly Login.
        <AcUnitIcon fontSize="large" />
      </Typography>
      <Link to="/userLogin" className="link">
        Home
      </Link>
    </div>
  );
};
export default MenuFallBack;
