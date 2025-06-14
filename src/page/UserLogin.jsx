/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Container,
  Link
} from '@mui/material';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertBar from '../Component/AlertComp/AlertBar';

// TicketLogin
export const UserLogin = ({setAuthenticateded, setUserData}) => {
  // const { authenticated } = useAuth();
  const [status, setStatus] = useState({message: '', severity: ''});
  const [newRow, setNewRow] = useState({
    id: '',
    password: ''
  });
  const [alertOpen, setAlertOpen] = useState(true);
  const open = true;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'id' ? value.slice(0, 4).toUpperCase() : value;
    setNewRow((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSignUp = () => {
    navigate('/');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/jwtUserLogin', newRow);
      const {token} = response.data;
      setUserData(response?.data?.userDetail);
      localStorage.setItem('token', token);
      setAuthenticateded(true);
      navigate('/landingPage');
      setNewRow({id: '', password: ''});
    } catch (error) {
      setStatus({
        message: 'Login Failed. Please Check your credentials again.',
        severity: 'error'
      });
      setAlertOpen(true);
      console.error('Error logging in:', error);
    }
  };

  const handleGenerate = () => {
    navigate('/generateUserPassword');
  };

  return (
    <div className="form_bg">
      <Dialog
        className="formCustom2"
        open={open}
        // onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogContent className="flex-idea">
          <Container className="flexible">
            <div className="imgsrc" />
            <Box
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              // onContextMenu={handleContextMenu}
              component="form"
              noValidate
              autoComplete="off"
              className="formCustom"
            >
              <AlertBar status={status} setStatus={setStatus} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
              <Typography variant="h3">Welcome to the Club </Typography>
              {/* <DialogContentText> */}
              <div className="marginUp">
                <TextField
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  name="id"
                  id="outlined-basic"
                  placeholder="User ID"
                  label="User ID"
                  color="warning"
                  variant="outlined"
                  value={newRow.id}
                  onChange={handleInputChange}
                  focused
                />
              </div>
              <div>
                <Link component="button" variant="body2" onClick={handleGenerate}>
                  Not sure about the password? Try me
                </Link>
              </div>
              <div className="marginUp">
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined" focused>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

                  <OutlinedInput
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    label="password"
                    placeholder="Enter password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    color="success"
                    onChange={handleInputChange}
                    value={newRow.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              {/* </DialogContentText> */}
              <div className="marginUp">
                <Button onClick={handleSubmit} variant="contained">
                  Login
                </Button>
              </div>
              <Button onClick={handleSignUp} variant="contained">
                Go Back To Club Page
              </Button>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

UserLogin.propTypes = {
  setAuthenticateded: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired
};
