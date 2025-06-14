/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment
} from '@mui/material';
import axios from 'axios';
import GETPUTDelete from '../Paginations/GETPUTDelete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const BasicTextFields = () => {
  const [data, setData] = useState([]);
  // const { authenticated } = useAuth();
  const [status, setStatus] = useState({message: '', severity: ''});
  const [isValid, setIsValid] = useState(false);
  const [newRow, setNewRow] = useState({
    MID: '',
    name: '',
    MPIN: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'MID' ? value.slice(0, 4).toUpperCase() : value;
    setNewRow((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Checking if user exists with same MID
      const isMidExists = data.some((item) => item.MID === newRow.MID);
      if (isMidExists) {
        setStatus({
          message: 'User ID already exists for MID',
          severity: 'error'
        });
      } else if (newRow.name.trim() === '') {
        setStatus({message: 'Name cannot be empty', severity: 'error'});
      } else if (newRow.MPIN.length >= 10) {
        setStatus({
          message: 'MPIN must be within 10 characters',
          severity: 'error'
        });
      } else {
        // Send POST request with newRow data
        await axios.post('/adminPost', newRow);
        setData((prevData) => [...prevData, newRow]);
        setStatus({
          message: 'Data Added Successfully',
          severity: 'success'
        });
        setTimeout(() => {
          setIsValid(true);
        }, 2000);
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
     * Fetches data from the '/adminGet' endpoint
     *  and updates the state with the response data.
     * If an error occurs during the fetch, it logs the error to the console.
     *
     * @async
     * @function fetchData
     * @return {Promise<void>} A promise that resolves when
     *  the data has been fetched and state updated.
     */
    async function fetchData() {
      try {
        const response = await axios.get('/adminGet');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!isValid ? (
        <Box component="form" noValidate autoComplete="off" className="formCustom">
          {status.message && (
            <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
              {status.message}
            </Alert>
          )}
          <Typography variant="h3">Welcome to admin LOGIN/SIGNUP</Typography>
          <div className="marginUp">
            <TextField
              name="MID"
              id="outlined-basic"
              placeholder="ADMIN Unique MID"
              label="MID"
              variant="outlined"
              value={newRow.MID}
              onChange={handleInputChange}
              focused
            />
          </div>
          <div className="marginUp">
            <TextField
              name="name"
              id="filled-basic"
              label="NAME"
              placeholder="ADMIN Name"
              variant="outlined"
              color="warning"
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
                label="MPIN"
                placeholder="Choose 6 Character"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="MPIN"
                onChange={handleInputChange}
                value={newRow.MPIN}
                endAdornment={
                  <InputAdornment>
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="marginUp">
            <Button onClick={handleSubmit} variant="contained">
              Join the club!
            </Button>
            {/* <Button></Button> */}
          </div>
        </Box>
      ) : (
        <>
          <GETPUTDelete />
        </>
      )}
    </>
  );
};
export default BasicTextFields;
