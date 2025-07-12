/* eslint-disable linebreak-style */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import {useIntl} from 'react-intl';
import {LeftPanel} from './TicketWindowComp/Leftpanel';
import {RightPanel} from './TicketWindowComp/RightPanel';
import {seats} from '../../API/seats';
import {formatDate} from '../Utils/utils';

// TicketWindow Old
import PropTypes from 'prop-types';

export const TicketWindow = ({userData, setUserData}) => {
  const [rows, setRows] = useState([]);
  const intl = useIntl();
  // const [linkToExolore, setLinkToExplore] = useState(false);
  const [status, setStatus] = useState({message: '', severity: ''});
  const [isSeatOpt, setIsSeatOpt] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [seatValue, setSeatvalue] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [selectedCities, setSelectedCities] = useState({
    from: '',
    to: '',
    class: '',
    date: '',
    seat: '',
    setNewsletter: false
  });

  const handleDateChange = (date) => {
    const newDate = formatDate(date);
    // Update the 'date' property of the selectedCities object
    setSelectedCities((prevCities) => ({
      ...prevCities,
      date: newDate
    }));
  };
  // const handleFromChange = (event, newValue) => {
  //   setFromValue(newValue);
  //   setSelectedCities((prevCities) => ({
  //     ...prevCities,
  //     from: newValue,
  //   }));
  // };

  const handleFromChange = (event, newValue) => {
    if (newValue) {
      // Extract the specific fields you want from newValue
      const {code, name, city, country} = newValue;

      // Create a new object with the extracted fields
      const selectedValue = {code, name, city, country};
      setFromValue(newValue);

      setSelectedCities((prevCities) => ({
        ...prevCities,
        from: selectedValue
      }));
    } else {
      // If newValue is null (nothing selected), reset fromValue
      setFromValue(null);
    }
  };

  const handleToChange = (event, newValue) => {
    if (newValue) {
      // Extract the specific fields you want from newValue
      const {code, name, city, country} = newValue;

      // Create a new object with the extracted fields
      const selectedValue = {code, name, city, country};

      // Update the fromValue state with the selectedValue
      setToValue(newValue);

      setSelectedCities((prevCities) => ({
        ...prevCities,
        to: selectedValue
      }));
    } else {
      // If newValue is null (nothing selected), reset fromValue
      setToValue(null);
    }
  };

  const handleSeatSelection = (event, newValue) => {
    setSeatvalue(newValue);
    setSelectedCities((prevCities) => ({
      ...prevCities,
      seat: newValue
    }));
  };

  const handleClassChange = (event) => {
    // Update the 'class' property of the selectedCities object
    setSelectedCities((prevCities) => ({
      ...prevCities,
      class: event.target.value
    }));
  };

  const handleSeat = () => {
    if (userData?.visaStatus === 'Denied') {
      setIsSeatOpt(false);
    }
    setIsSeatOpt(true);
  };

  const handleCheckboxChange = (event) => {
    setSelectedCities((prevState) => ({
      ...prevState,
      setNewsletter: event.target.checked
    }));
  };

  const handleSubmit = () => {
    // if (fromValue && fromValue.city && toValue && toValue.city) {
    if (selectedCities.from && selectedCities.to && selectedCities.class && selectedCities.date) {
      // if (selectedCities.from === selectedCities.to) {
      if (selectedCities.class === 'EC-CL') {
        selectedCities.class = 'Economy Class';
      } else if (selectedCities.class === 'B-CL') {
        selectedCities.class = 'Business Class';
      } else if (selectedCities.class === 'PE-CL') {
        selectedCities.class = 'Premium Economy Class';
      } else {
        selectedCities.class = 'Special Class';
      }
      // setShowData(false);
      setShowLoader(true);
      // }
    } else {
      setStatus({
        message: 'Please fill the details correctly.',
        severity: 'error'
      });
      // alert(
      //   "From and To values are not selected or do not have city properties."
      // );
    }
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/airportGet`)
        .then((response) => {
          setRows(response.data);
        })
        .catch((e) => {
          console.error('error', e);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPrice = () => {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/priceGet`)
        .then((response) => {
          setPriceData(response.data);
        })
        .catch((e) => {
          console.error('error', e);
          //   setStatus({
          //     message: `Error`,
          //     severity: "error",
          //   });
        });
    };
    fetchPrice();
  }, []);

  const defaultProps = {
    options: rows,
    getOptionLabel: (option) => option.city + ' (' + option.code + ')'
  };
  // Responsibe to submit user data with travel history comming from container6
  // eslint-disable-next-line require-jsdoc
  async function handleSubmitPropDetails() {
    const objectIdToUpdate = userData?.id;
    // setLinkToExplore(true);

    try {
      if (!objectIdToUpdate) {
        console.error(`Object with id ${objectIdToUpdate} not found in userData.`);
        return;
      }

      // Make a PATCH request to update the data on the server
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/updateData/${objectIdToUpdate}`, {
        properties: selectedCities
      });

      if (response.status === 202) {
        const userDataWithoutPassword = {...response.data};
        delete userDataWithoutPassword.password;
        setUserData(userDataWithoutPassword);
        setStatus({
          // eslint-disable-next-line max-len
          message: `Item with ID = "${objectIdToUpdate}" updated successfully. Do you want to exlore more., click down button to explore your upcommings`,
          severity: 'success'
        });
      } else {
        setStatus({
          message: `Item with ID = "${objectIdToUpdate}" Failed to get update.`,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <>
      {/* <Alert
      style={{position: 'absolute', width: '-webkit-fill-available'}}
          onClose={() => setStatus({ message: '', severity: '' })}
          severity="info"
        >
           Here is a gentle confirmation that your action was successful.
        </Alert> */}
      {status.message && (
        <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
          {status.message}
        </Alert>
      )}
      {!showLoader ? (
        // <div className="Hello" style={{backgroundColor: 'darkcyan'}}>
        //   <Typography>Hello</Typography>
        // </div>
        <Grid sx={{flexGrow: 1}} container spacing={0}>
          <Grid item xs={6}>
            <div className="ticketData" style={{backgroundColor: 'rgb(227 227 182)', height: '85vh'}}>
              <Card sx={{maxWidth: 345}} className="userMain ticketWindow">
                <Typography variant="h3" textAlign={'center'}>
                  {intl.formatMessage({
                    id: 'Ready-to-fly'
                  })}
                  <FlightTakeoffIcon />
                </Typography>
                <CardMedia
                  component="img"
                  // alt="green iguana"
                  height="140"
                  className="imageCard"
                />

                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} style={{backgroundColor: '#fff'}}>
                      {/* <Box
                className="formMain"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, display: "flex", width: "56ch" },
                }}
                noValidate
                autoComplete="off"
              > */}
                      <Autocomplete
                        {...defaultProps}
                        autoComplete
                        id="combo-box-demo"
                        options={rows}
                        sx={{width: 300}}
                        value={fromValue}
                        onChange={handleFromChange}
                        renderInput={(params) => <TextField {...params} label="From" focused placeholder="Boarding" />}
                      />
                    </Grid>
                    <Grid item xs={6} style={{backgroundColor: '#fff'}}>
                      <Autocomplete
                        {...defaultProps}
                        autoComplete
                        id="combo-box-demo"
                        options={rows}
                        sx={{width: 300}}
                        value={toValue}
                        onChange={handleToChange}
                        renderInput={(params) => (
                          <TextField {...params} label="To" focused color="success" placeholder="Destination" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} style={{backgroundColor: '#fff'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DemoContainer color="success" components={['MobileDatePicker']}>
                          <DemoItem>
                            <DesktopDatePicker
                              color="success"
                              className="ticketDateStyle"
                              name="date"
                              label="Travel Date"
                              value={selectedCities.date}
                              onChange={handleDateChange}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} style={{backgroundColor: '#fff', paddingLeft: '8px'}}>
                      <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-select-small-label">Class</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={selectedCities.class}
                          label="Age"
                          onChange={handleClassChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'EC-CL'}>
                            {intl.formatMessage({
                              id: 'Economy'
                            })}
                          </MenuItem>
                          <MenuItem value={'PE-CL'}>
                            {intl.formatMessage({
                              id: 'Premium-economy'
                            })}
                          </MenuItem>
                          <MenuItem value={'B-CL'}>
                            {intl.formatMessage({
                              id: 'Business-class'
                            })}
                          </MenuItem>
                          <MenuItem value={'SP-CL'}>
                            {intl.formatMessage({
                              id: 'Special'
                            })}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{backgroundColor: '#fff'}}>
                      <FormControlLabel
                        control={<Checkbox checked={selectedCities.setNewsletter} onChange={handleCheckboxChange} />}
                        label={'I would like to join for the upcoming blogs newsletter'}
                      />
                    </Grid>
                  </Grid>

                  <CardActions>
                    <Button variant="contained" onClick={handleSubmit}>
                      {intl.formatMessage({
                        id: 'Check'
                      })}
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="ticketData" style={{backgroundColor: 'rgb(227 227 182)', height: '85vh'}}>
              <Card sx={{maxWidth: 345}} className="secondMain">
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography sx={{display: 'inline'}} component="span" variant="body2" color="text.primary">
                            Ali Connors
                          </Typography>
                          {` — I'll be in your neighborhood
                            doing errands this…`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Card>
              {/* <Card sx={{ maxWidth: 345 }} className='secondMain'>
                <CardMedia
                  component='img'
                  // alt="green iguana"
                  height='140'
                  className='newCard'
                />
                <CardMedia
                  component='img'
                  // alt="green iguana"
                  height='140'
                  className='imageCard'
                />
                <CardMedia
                  component='img'
                  // alt="green iguana"
                  height='140'
                  className='newCard2'
                />
                <CardMedia
                  component='img'
                  // alt="green iguana"
                  height='140'
                  className='newCard3'
                />
              </Card> */}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div>
          {/* <button onClick={handleSubmit}>Enable Div</button> */}
          {/* {showLoader && ( */}
          <Container fixed>
            <Box
              sx={
                {
                  // width: "122%",
                  // height: 300,
                }
              }
            >
              <Grid container spacing={100}>
                <LeftPanel selectedCities={selectedCities} />
                <Grid item xs={6} className="nextSpaceGridUser">
                  <RightPanel
                    userData={userData}
                    priceData={priceData}
                    selectedCities={selectedCities}
                    // handleTravelDetailSubmit={"hola"}
                    handleSeat={handleSeat}
                    isSeatOpt={isSeatOpt}
                    seats={seats}
                    seatValue={seatValue}
                    handleSeatSelection={handleSeatSelection}
                    status={status}
                    handleSubmitPropDetails={handleSubmitPropDetails}
                    intl={intl}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Typography>
                  {intl.formatMessage({
                    id: 'Content-discovery-soon'
                  })}
                </Typography>
              </Grid>
            </Box>
          </Container>
          {/* )} */}
        </div>
      )}
    </>
  );
};
TicketWindow.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string,
    visaStatus: PropTypes.string
  }).isRequired,
  setUserData: PropTypes.func.isRequired
};
