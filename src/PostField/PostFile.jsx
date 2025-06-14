/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
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
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import {ColorRing} from 'react-loader-spinner';
import countryList from '../API/countries.json';

const PostFile = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({message: '', severity: ''});
  const [showLoader, setShowLoader] = useState(false);
  const [newRow, setNewRow] = useState({
    id: '',
    name: '',
    location: '',
    country: ''
  });

  const handleCancel = (index) => {
    const dataRm = [...data];
    dataRm.splice(index, 1);
    setData(dataRm);
  };
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    const newValue = name === 'id' ? value.slice(0, 4).toUpperCase() : value;
    setNewRow((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };
  const handleAddRow = () => {
    if (newRow.id && newRow.name && newRow.location && newRow.country) {
      setData([...data, newRow]);
      setNewRow({id: '', name: '', location: '', country: ''});
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
    if (data.length > 0) {
      try {
        await axios.post('/postData', data);
        setStatus({
          message: 'Data Added Successfully',
          severity: 'success'
        });
        setShowLoader(true);
        setNewRow({id: '', name: '', location: '', country: ''});
        handleCancel();
        setTimeout(() => {
          setShowLoader(false);
        }, 2000);
      } catch (error) {
        setStatus({message: 'Failed to send data', severity: 'error'});
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
                <TableCell>Enter Your Details</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Nationality</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.country}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField
                    //   required
                    name="id"
                    color="secondary"
                    value={newRow.id}
                    label="Passenger 4 Digit ticket ID"
                    placeholder="ID"
                    focused
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
                  <Select
                    //   required
                    name="country"
                    color="warning"
                    placeholder="Select"
                    // label="Status"
                    value={newRow.country || ''}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {countryList.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
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

export default PostFile;
