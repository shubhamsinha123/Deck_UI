/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
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
  Grid
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertBar from '../Component/AlertComp/AlertBar';

/**
 * HomeAdminSignUp component for admin sign-up form.
 * @param {Object} props - The component props.
 * @param {Function} props.setAuthenticated - Function to set authentication
 * status.
 * @return {JSX.Element} The rendered component.
 */
const HomeAdminSignUp = ({setAuthenticated}) => {
  const [data, setData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(true);
  // const { authenticated } = useAuth();
  const [status, setStatus] = useState({message: '', severity: ''});
  const [newRow, setNewRow] = useState({
    MID: '',
    name: '',
    MPIN: ''
  });
  // const [open, setOpen] = useState(true);
  const open = true;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /**
   * Handles input change for form fields.
   * @param {Object} event - The event object.
   */
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'MID' ? value.slice(0, 4).toUpperCase() : value;
    setNewRow((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  /**
   * Handles the form submission.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Checking if user exists with same MID
      const isMidExists = data.some((item) => item.MID === newRow.MID);

      if (isMidExists) {
        setStatus({
          message: "User's MID already exists",
          severity: 'error'
        });
        setAlertOpen(true);
      } else if (newRow.MID.trim() === '') {
        setAlertOpen(true);
        setStatus({message: `MID can't be empty`, severity: 'error'});
      } else if (newRow.MPIN.length >= 10) {
        setAlertOpen(true);
        setStatus({
          message: 'MPIN must be within 10 characters',
          severity: 'warning'
        });
      } else {
        // Send POST request with newRow data
        await axios.post('/adminPost', newRow);
        setData((prevData) => [...prevData, newRow]);
        setStatus({
          message: 'Data Added Successfully',
          severity: 'success'
        });
        const {MID, MPIN} = newRow;
        const authReqBody = {
          MID,
          MPIN
        };
        const authResponse = await axios.post('/adminJwtLogin', authReqBody);
        localStorage.setItem('tokenAdmin', authResponse.data.token);
        setAuthenticated(true);
        setTimeout(() => {
          // setIsValid(true);
        }, 1000);
        navigate('/admin');
        setNewRow({MID: '', name: '', MPIN: ''});
      }
    } catch (error) {
      setStatus({message: 'Failed to send data', severity: 'error'});
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    // Calling GET End point
    /**
     * Fetches data from the '/adminGet' endpoint and
     *  updates the state with the response data.
     * If the request fails with a 403 status, sets the status to indicate
     * that the user is offline or the token has expired.
     * If the request fails with any other status, sets the
     *  status to indicate that something went wrong.
     *
     * @async
     * @function fetchData
     * @return {Promise<void>} A promise that resolves
     *  when the data fetching is complete.
     */
    async function fetchData() {
      try {
        const response = await axios.get('/adminGet');
        setData(response.data);
      } catch (error) {
        if (error?.response?.status === 403) {
          setStatus({
            message: 'You are offline or Token expired',
            severity: 'info'
          });
        } else {
          setStatus({
            message: 'something went wrong',
            severity: 'error'
          });
        }
      }
    }
    fetchData();
  }, []);

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
        <DialogContent>
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
                name="MID"
                id="outlined-basic"
                placeholder="ADMIN Unique MID"
                label="MID"
                color="warning"
                variant="outlined"
                value={newRow.MID}
                onChange={handleInputChange}
                focused
              />
            </div>
            <div className="marginUp">
              <TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                name="name"
                id="filled-basic"
                label="NAME"
                placeholder="ADMIN Name"
                variant="outlined"
                value={newRow.name}
                onChange={handleInputChange}
                error={status.severity === 'error' && status.message.includes('NAME')}
                helperText={status.message.includes('NAME') && status.message}
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
                  placeholder="Choose 6 Character"
                  id="success-basic"
                  type={showPassword ? 'text' : 'password'}
                  name="MPIN"
                  color="success"
                  onChange={handleInputChange}
                  value={newRow.MPIN}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            {/* </DialogContentText> */}
            <Grid sx={{flexGrow: 1}} container spacing={0}>
              <Grid item xs={4}>
                <Button onClick={handleSubmit} variant="contained" style={{height: '3rem'}}>
                  Join the club!
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" className="buttonCustom" style={{height: '3rem'}}>
                  <Link to={'/adminLogin'} className="buttonLinkCustom">
                    Login as Admin
                  </Link>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" className="buttonCustom" style={{height: '3rem'}}>
                  <Link to={'/userLogin'} className="buttonLinkCustom">
                    Login
                  </Link>
                </Button>
              </Grid>
              {/* <Button></Button> */}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
HomeAdminSignUp.propTypes = {
  setAuthenticated: PropTypes.func.isRequired
};
export default HomeAdminSignUp;
