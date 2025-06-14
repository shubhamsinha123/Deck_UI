/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogContent,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Container
} from '@mui/material';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { handleContextMenu } from "./utils";

// TicketLogin
const AdminLogin = ({setAdminLogin}) => {
  const [status, setStatus] = useState({message: '', severity: ''});
  const [newRow, setNewRow] = useState({
    MID: '',
    MPIN: ''
  });

  const open = true;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'MID' ? value.slice(0, 4).toUpperCase() : value;
    setNewRow((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSignUp = () => {
    navigate('/');
  };

  const handleUserSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/adminJwtLogin`, newRow);
      const {token} = response.data;
      localStorage.setItem('tokenAdmin', token);
      setStatus({message: 'Logged In successfully', severity: 'success'});
      setAdminLogin(true);
      navigate('/admin');
      setNewRow({MID: '', MPIN: ''});
    } catch (error) {
      setStatus({
        message: 'Login Failed. Please Check your credentials again.',
        severity: 'error'
      });
    }
  };

  return (
    <div className="form_bg">
      {/* {!isValid ? ( */}
      {/* <BootstrapDialog
        // onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        open={open}
      > */}
      <Dialog
        className="formCustom2"
        open={open}
        // onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        <DialogContent className="flex-idea">
          <Container className="flexible">
            <>
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
                {status.message && (
                  <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
                    {status.message}
                  </Alert>
                )}
                <Typography variant="h3">Welcome to the Club </Typography>
                {/* <DialogContentText> */}
                <div className="marginUp">
                  <TextField
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    name="MID"
                    id="outlined-basic"
                    placeholder="Admin MID"
                    label="MID"
                    color="warning"
                    variant="outlined"
                    value={newRow.MID}
                    onChange={handleInputChange}
                    focused
                  />
                </div>
                <div className="marginUp">
                  <FormControl sx={{m: 1, width: '25ch'}} variant="outlined" focused>
                    <InputLabel htmlFor="outlined-adornment-password">MPIN</InputLabel>

                    <OutlinedInput
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      label="MPIN"
                      placeholder="Place your secret MPIN"
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      name="MPIN"
                      color="success"
                      onChange={handleInputChange}
                      value={newRow.MPIN}
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
                <div className="adminLoginBtn">
                  <Button onClick={handleUserSubmit} variant="contained">
                    Login
                  </Button>
                </div>
                <Typography variant="body">Not a member! Please join us..</Typography>
                <Button onClick={handleSignUp} variant="contained">
                  Go To Club Page
                </Button>
              </Box>
            </>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};
AdminLogin.propTypes = {
  setAdminLogin: PropTypes.func.isRequired
};
export default AdminLogin;
