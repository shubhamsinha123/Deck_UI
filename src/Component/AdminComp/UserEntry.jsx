/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Box
} from '@mui/material';
import 'dayjs/locale/en-gb';
import PropTypes from 'prop-types';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {ColorRing} from 'react-loader-spinner';
import {formatDate, tableHead} from '../Utils/utils';
import {DesktopDatePicker} from '@mui/x-date-pickers';

// PostFile
const UserEntry = () => {
  const [data, setData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [status, setStatus] = useState({message: '', severity: ''});
  const [showLoader, setShowLoader] = useState(false);
  const [newRow, setNewRow] = useState({
    id: '',
    name: '',
    location: '',
    country: '',
    date: '',
    isPassword: false
  });

  const handleCancel = (index) => {
    const dataRm = [...data];
    dataRm.splice(index, 1);
    setData(dataRm);
  };

  const handleDateChange = (date) => {
    const newDate = formatDate(date);
    setNewRow((prevRow) => ({
      ...prevRow,
      date: newDate
    }));
  };

  useEffect(() => {
    axios
      .get('/countryList')
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCountryChange = (event, value) => {
    setNewRow((prevData) => ({
      ...prevData,
      country: value ? value.label : ''
    }));
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'id' ? value.slice(0, 3).toUpperCase() : value;
    if (name === 'date') {
      // Slice the value to get only the date part (first 10 characters)
      const parsevalue = newValue;
      handleDateChange(parsevalue);
    } else {
      setNewRow((prevData) => ({
        ...prevData,
        [name]: newValue
      }));
    }
  };
  // onBlur for ID field //test
  const handleBlur = (event) => {
    const {name, value} = event.target;
    if (name === 'id') {
      const newValue = `T${value}`;
      setNewRow((prevData) => ({
        ...prevData,
        [name]: newValue
      }));
    }
  };

  const handleAddRow = () => {
    if (newRow.id && newRow.name && newRow.location && newRow.country) {
      setData([...data, newRow]);
      setNewRow({id: '', name: '', location: '', country: '', date: ''});
    } else {
      setStatus({
        message: 'Please fill and add all required fields',
        severity: 'warning'
      });
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({message: '', severity: ''});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (data.length > 0) {
      try {
        await axios.post('/postData', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatus({
          message: 'Data Added Successfully',
          severity: 'success'
        });
        setShowLoader(true);
        setNewRow({
          id: '',
          name: '',
          location: '',
          country: '',
          date: ''
        });
        handleCancel();
        setTimeout(() => {
          setShowLoader(false);
        }, 2000);
      } catch (error) {
        setStatus({
          message: 'Failed to send data. Might be duplicate ID',
          severity: 'error'
        });
        console.error('Error posting data:', error);
      }
    }
  };

  return (
    <React.Fragment>
      <Typography className="textHeader">Passenger Window</Typography>
      {status.message && (
        <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
          {status.message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        {showLoader ? (
          <>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            <p>Loading...</p>
          </>
        ) : (
          <Table id="editableCell">
            <TableHead>
              <TableRow>
                {tableHead.map((cellContent, index) => (
                  <TableCell className="tableHeader" key={index}>
                    {cellContent}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField
                    //   required
                    name="id"
                    color="secondary"
                    value={newRow.id}
                    label="Passenger 4 Digit ticket ID (TID)"
                    placeholder="Default value T"
                    focused
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    //   required
                    name="name"
                    color="warning"
                    focused
                    label="Passenger Name"
                    placeholder="Name"
                    value={newRow.name}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    //   required
                    name="location"
                    color="success"
                    label="Destination"
                    placeholder="Location"
                    focused
                    value={newRow.location}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="country-select"
                      sx={{width: 300}}
                      options={countryData}
                      value={countryData?.find((country) => country.label === newRow.country) || null}
                      onChange={handleCountryChange}
                      autoHighlight
                      renderOption={(props, option) => {
                        // eslint-disable-next-line react/prop-types
                        const {key, ...optionProps} = props;
                        return (
                          <Box key={key} component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...optionProps}>
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose your nationality"
                          inputProps={{
                            ...params.inputProps,
                            // disable autocomplete and autofill
                            autoComplete: 'new-password'
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DemoContainer color="secondary" components={['MobileDatePicker']}>
                      <DemoItem>
                        <DesktopDatePicker
                          color="secondary"
                          name="date"
                          label="Travel Date"
                          value={newRow.date}
                          onChange={handleDateChange}
                          // renderInput={(params) => <TextField {...params} />}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>

                <TableCell>
                  <Button onClick={handleAddRow} variant="outlined">
                    Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <div className="buttonStyle">
        <Button onClick={handleSubmit} variant="contained" disabled={data.length === 0}>
          Submit
        </Button>

        <Button variant="outlined" onClick={handleCancel} disabled={data.length === 0} className="buttonCancel">
          Cancel
        </Button>
      </div>
    </React.Fragment>
  );
};
UserEntry.propTypes = {
  countryData: PropTypes.array.isRequired
};
export default UserEntry;
