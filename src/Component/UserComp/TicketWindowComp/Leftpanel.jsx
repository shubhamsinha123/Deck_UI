/* eslint-disable linebreak-style */
import React from 'react';
import {ListItemAvatar, ListItemText, List, ListItem, Avatar, Grid} from '@mui/material';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import {formattedDate} from '../../Utils/utils';

// container5
export const LeftPanel = (selectedCities) => {
  // const {date, class, from, to} = selectedCities
  // const {dates: date, }
  const {date, from, to, class: travelClass} = selectedCities?.selectedCities || {};

  const newDate = formattedDate(date);
  return (
    <Grid item xs={6}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}
      >
        <ListItem className="listData">
          <ListItemAvatar>
            <Avatar>
              <ScheduleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Date" secondary={newDate} />
        </ListItem>
        <ListItem className="listData">
          <ListItemAvatar>
            <Avatar>
              <FlightClassIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Class" secondary={travelClass} />
        </ListItem>
        <ListItem className="listData">
          <ListItemAvatar>
            <Avatar>
              <AirlineSeatReclineExtraIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Boarding" secondary={'(' + from?.city + ') ' + from?.name} />
        </ListItem>
        <ListItem className="listData">
          <ListItemAvatar>
            <Avatar>
              <AirlineSeatReclineExtraIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Destination" secondary={'(' + to?.city + ') ' + to?.name} />
        </ListItem>
      </List>
    </Grid>
  );
};
