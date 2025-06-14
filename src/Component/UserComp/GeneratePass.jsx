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
  Container,
  Alert,
  Snackbar,
  Link
} from '@mui/material';
export const GeneratePass = () => {
  const [userId, setUserId] = useState('');
  const [record, setRecord] = useState([]);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({message: '', severity: ''});
  const [confirmPassword, setConfirmPassword] = useState('');
  const open = true;

  const [alertOpen, setAlertOpen] = useState(false);
  const handleSbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  // for future cases
  // const base64Encode = (text) => {
  //   return btoa(text);
  // }

  const handleInputChange = (event) => {
    setUserId(event.target.value.toUpperCase());
  };

  const handlepassInput = (event) => {
    const {name, value} = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleFinalSubmit = async () => {
    if (password !== confirmPassword) {
      setAlertOpen(true);
      setStatus({
        message: `Password doesn't match`,
        severity: 'error'
      });
    } else {
      const data = {
        isPassword: true,
        password: password
      };
      await axios.patch(`updateData/${userId}`, data).then(() => {
        setStatus({
          message: 'Password Updated Successfully',
          severity: 'success'
        });
      });
      navigate('/');
      setRecord([]);
      setUserId('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleUserPassTest = async () => {
    if (userId.length === 0) {
      setStatus({
        message: 'Enter valid User ID',
        severity: 'error'
      });
      setAlertOpen(true);
      return;
    }
    try {
      const response = await axios.get(`getData/${userId}`);

      if (response?.data?.data[0]?.password) {
        setStatus({
          message: 'User ID already has password',
          severity: 'warning'
        });
        setAlertOpen(true);
      } else {
        setRecord(response?.data?.data);
      }
    } catch (error) {
      if (error?.response?.data.status === 'FAILURE') {
        setStatus({
          message: 'User ID not found',
          severity: 'error'
        });
        setAlertOpen(true);
      }
    }
  };

  return (
    <div className="form_bg">
      <Dialog
        className="formCustom2"
        open={open}
        // onClose={handleClose}
        aria-labelledby="edit-apartment"
      >
        {status.message && (
          <Snackbar
            autoHideDuration={6000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={alertOpen}
            onClose={handleSbarClose}
          >
            <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
              {status.message}
            </Alert>
          </Snackbar>
        )}
        <DialogContent className="flex-idea">
          <Container className="flexible">
            {record.length > 0 && record[0]?.isPassword === false ? (
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
                  {/* <DialogContentText> */}
                  <Typography variant="body">Please enter your new password</Typography>
                  <div className="marginUp">
                    <TextField
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      name="password"
                      id="outlined-basic"
                      label="Password"
                      color="warning"
                      variant="outlined"
                      value={password}
                      onChange={handlepassInput}
                      focused
                    />
                  </div>
                  <div className="marginUp">
                    <TextField
                      name="confirmPassword"
                      id="outlined-basic"
                      label="Confirm Password"
                      color="warning"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={handlepassInput}
                      focused
                    />
                  </div>
                  {/* </DialogContentText> */}
                  <div className="adminLoginBtn">
                    <Button onClick={handleFinalSubmit} variant="contained">
                      Submit
                    </Button>
                    <Link component="button" variant="body2" onClick={handleGoHome}>
                      wanna go back home!
                    </Link>
                  </div>
                </Box>
              </>
            ) : (
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
                  {/* <DialogContentText> */}
                  <div className="marginUp">
                    <TextField
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      name="id"
                      id="outlined-basic"
                      label="User ID"
                      color="warning"
                      variant="outlined"
                      value={userId}
                      required
                      onChange={handleInputChange}
                      // focused
                    />
                  </div>
                  {/* </DialogContentText> */}
                  <div className="adminLoginBtn">
                    <Button onClick={handleUserPassTest} variant="contained">
                      Login
                    </Button>
                  </div>
                  <Typography variant="body">Wanna go back Home!</Typography>
                  <Button onClick={handleGoHome} variant="contained">
                    Home
                  </Button>
                </Box>
              </>
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};
