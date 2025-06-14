/* eslint-disable linebreak-style */
import React from 'react';
import {Card, CardContent, CardMedia, Container, Divider, Typography, Tooltip, Zoom} from '@mui/material';
import {useIntl} from 'react-intl';
import {formateIsoDate} from '../Utils/utils';

// MyProfile
export const UserProfile = (userData) => {
  const intl = useIntl();
  const {
    date,
    properties: {seat, class: Class, date: propertiesDate, from, to} = {},
    name,
    id,
    location,
    country,
    visaStatus
  } = (userData && userData.userData) || {};

  console.log(userData.userData);
  console.log(userData.userData?.properties);

  const propertiesExists = userData.userData?.properties;

  const datematch = formateIsoDate(date);
  const recordDate = formateIsoDate(propertiesDate);
  // const dateProp = formattedDate(userData?.userData[0]?.properties?.date);
  return (
    <div className="UserProfile">
      <Typography variant="h4" textAlign={'center'}>
        {intl.formatMessage({
          id: 'Profile-dashboard'
        })}
      </Typography>
      <Container>
        <Card sx={{display: 'flex'}} className="MyProfileCard">
          <CardMedia
            component="img"
            sx={{width: 500}}
            image="https://i.ibb.co/0MJFvcs/mini-profile-bg-02.jpg"
            alt="Live from space album cover"
          />
          <CardContent sx={{flex: '1 0 auto'}}>
            <Typography component="div" variant="h5">
              {intl.formatMessage({
                id: 'Welcome-dashboard'
              })}
            </Typography>
            <hr />
            <Typography style={{display: 'flex'}} component="div">
              <Typography variant="h5">
                {intl.formatMessage({
                  id: 'User-id'
                })}
              </Typography>
              <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                {id}
              </Typography>
            </Typography>

            <Typography style={{display: 'flex'}} component="div">
              <Typography variant="h5">{intl.formatMessage({id: 'Name', defaultMessage: 'Default'})}</Typography>
              <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                {name}
              </Typography>
            </Typography>

            <Typography style={{display: 'flex'}}>
              <Typography variant="h5" component="div">
                {intl.formatMessage({
                  id: 'Location'
                })}
              </Typography>
              <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                {location}
              </Typography>
            </Typography>

            <Typography style={{display: 'flex'}}>
              <Tooltip title="Native Country" TransitionComponent={Zoom} arrow placement="top">
                <Typography variant="h5" component="div">
                  {intl.formatMessage({
                    id: 'Native-country'
                  })}
                </Typography>
              </Tooltip>
              <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                {country}
              </Typography>
            </Typography>

            <Typography style={{display: 'flex'}}>
              <Typography variant="h5" component="div">
                {intl.formatMessage({
                  id: 'Visa-status'
                })}
              </Typography>
              <Typography
                variant="h5"
                color={visaStatus === 'Approved' ? 'green' : 'error'}
                className="gapBtwnKeyVal"
                style={{textDecoration: 'underline'}}
              >
                {visaStatus
                  ? visaStatus
                  : `${intl.formatMessage({
                      id: 'No-status-visa'
                    })}`}
              </Typography>
            </Typography>

            <Typography style={{display: 'flex'}} component="div">
              <Typography variant="h5">
                {intl.formatMessage({
                  id: 'Appplication-date'
                })}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {datematch}
              </Typography>
            </Typography>
          </CardContent>
        </Card>
        {Object.keys(propertiesExists).length > 1 && (
          <>
            <Divider />
            <Typography variant="h4" textAlign={'center'}>
              {intl.formatMessage({
                id: 'Travel-record-headline'
              })}
            </Typography>
            <Card sx={{display: 'flex'}} className="MyProfileCard">
              <CardMedia
                component="img"
                sx={{width: 500}}
                image="https://i.ibb.co/cyWhtsP/marc-kleen-e-Rwm-Bvhfv-G8-unsplash.jpg"
                alt="Live from space album cover"
              />
              <CardContent sx={{flex: '1 0 auto'}}>
                <Typography component="div" variant="h4">
                  {intl.formatMessage({
                    id: 'Travel-success-message'
                  })}
                </Typography>
                {/* <Divider />
                 */}
                <hr />

                {/* Boarding From */}
                <Typography style={{display: 'flex'}}>
                  <Typography variant="h5" component="div">
                    {intl.formatMessage({
                      id: 'Boarding-from'
                    })}
                  </Typography>
                  <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                    {from?.city}
                    {' (' + from?.country + ')'}
                  </Typography>
                </Typography>

                {/* Boarding to */}
                <Typography style={{display: 'flex'}}>
                  <Typography variant="h5" component="div">
                    {intl.formatMessage({
                      id: 'Boarding-to'
                    })}
                  </Typography>
                  <Typography variant="h5" color="text.primary" className="gapBtwnKeyVal">
                    {to?.city}
                    {' (' + to?.country + ')'}
                  </Typography>
                </Typography>

                {/* Seat Details */}
                <Typography style={{display: 'flex'}}>
                  <Typography variant="h5" component="div">
                    {intl.formatMessage({
                      id: 'Seat'
                    })}
                  </Typography>
                  <Typography variant="h6" color="text.primary" className="gapBtwnKeyVal">
                    {seat}
                  </Typography>
                </Typography>

                {/* Class Details */}

                <Typography style={{display: 'flex'}}>
                  <Typography variant="h5" component="div">
                    {intl.formatMessage({
                      id: 'Class'
                    })}
                  </Typography>
                  <Typography variant="h6" color="text.primary" className="gapBtwnKeyVal">
                    {Class}
                  </Typography>
                </Typography>

                <Typography style={{display: 'flex'}}>
                  <Typography variant="h5" component="div">
                    {intl.formatMessage({
                      id: 'Travel-date'
                    })}
                  </Typography>
                  <Typography variant="h6" color="text.primary" className="gapBtwnKeyVal">
                    {recordDate}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
};
