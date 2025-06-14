/* eslint-disable linebreak-style */
import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Container,
  Box,
  Autocomplete,
  TextField,
  Tooltip
} from '@mui/material';
import MoneySharpIcon from '@mui/icons-material/MoneySharp';
import PropTypes from 'prop-types';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import Button2 from '@mui/material-next/Button';

// container6
export const RightPanel = ({
  userData,
  priceData,
  selectedCities,
  handleSeat,
  isSeatOpt,
  seats,
  seatValue,
  handleSeatSelection,
  handleSubmitPropDetails,
  intl
}) => {
  let price = '';

  // const submitUserDetails = () => {
  //   let newData = [...userData];
  //   newData?.properties?.push(selectedCities);
  //   setStatus({
  //     message: "Data registered successfully",
  //     severity: "success",
  //   });
  //   // userData?.properties?.push(selectedCities);
  //   setAllData(newData);
  // };

  const stringAvatar = (name) => {
    const [firstName, lastName] = name && name.includes(' ') ? name.split(' ') : [name, ''];
    if (name && typeof name === 'string' && name.includes(' ')) {
      return {
        children: `${firstName[0]}${lastName[0]}`
      };
    } else {
      // Handle the case where 'name' is undefined or doesn't contain a space
      return {children: `${firstName[0]}`};
    }
  };

  if (selectedCities?.from?.code === priceData[0]?.codeFrom && selectedCities?.to?.code === priceData[0]?.codeTo) {
    price = `$${priceData[0]?.price}`;
  } else {
    price = '$499';
  }
  const {name, visaStatus, id} = userData;

  return (
    <Container fixed>
      <Box sx={{bgcolor: '#eee5cb', height: '50vh'}}>
        <ListItem className="listData">
          <ListItemAvatar>
            <Tooltip title={name}>
              <Avatar
                {...stringAvatar(name)}
                // {/* // <MoneySharpIcon /> */}
              />
            </Tooltip>
          </ListItemAvatar>
          <ListItemText primary="user ID" secondary={id} />
        </ListItem>

        <ListItem className="listData">
          <ListItemAvatar>
            <Avatar>
              <MoneySharpIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ticket Price" secondary={price} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonSearchIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Visa Status" secondary={visaStatus ? visaStatus : 'NA'} />
        </ListItem>
        {(visaStatus === 'Denied') | (visaStatus === undefined) ? (
          <>
            <em>{intl.formatMessage({id: 'Sorry', defaultMessage: 'Default'})}</em>
          </>
        ) : (
          <>
            <Button2
              className="buttonSpecial"
              color="secondary"
              disabled={false}
              size="large"
              variant="outlined"
              onClick={handleSeat}
            >
              {intl.formatMessage({
                id: 'Check-seat'
              })}
            </Button2>
          </>
        )}

        {isSeatOpt && (
          <>
            <ListItem className="listData">
              <ListItemAvatar>
                <Avatar>
                  <LockPersonRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <Autocomplete
                required
                disablePortal
                options={seats}
                sx={{width: 300}}
                value={seatValue}
                onChange={handleSeatSelection}
                renderInput={(params) => <TextField {...params} label="Seat" />}
              />
            </ListItem>
            <Button2
              className="buttonCustomFlex"
              color="secondary"
              disabled={!seatValue}
              size="large"
              variant="outlined"
              // onClick={submitAll}
              onClick={handleSubmitPropDetails}
            >
              {intl.formatMessage({
                id: 'Check-status'
              })}
            </Button2>
          </>
        )}
      </Box>
      {isSeatOpt && (
        <Box
          className="layoutImg"
          component="img"
          sx={{}}
          alt="The house from the offer."
          src="https://i.ibb.co/7Q4gQM5/flight-seat.jpg"
        ></Box>
      )}
    </Container>
  );
};
RightPanel.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    visaStatus: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  priceData: PropTypes.arrayOf(
    PropTypes.shape({
      codeFrom: PropTypes.string,
      codeTo: PropTypes.string,
      price: PropTypes.number
    })
  ).isRequired,
  selectedCities: PropTypes.shape({
    from: PropTypes.shape({
      code: PropTypes.string
    }),
    to: PropTypes.shape({
      code: PropTypes.string
    })
  }).isRequired,
  handleSeat: PropTypes.func.isRequired,
  isSeatOpt: PropTypes.bool.isRequired,
  seats: PropTypes.arrayOf(PropTypes.string).isRequired,
  seatValue: PropTypes.string,
  handleSeatSelection: PropTypes.func.isRequired,
  handleSubmitPropDetails: PropTypes.func.isRequired,
  linkToExolore: PropTypes.string,
  intl: PropTypes.object.isRequired
};
