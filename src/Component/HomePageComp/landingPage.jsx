/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Alert,
  Button,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Icon,
  Collapse,
  Avatar,
  Tooltip,
  Zoom
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
// import PersonIcon from '@mui/icons-material/Person';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {red} from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import UserEntry from '../AdminComp/UserEntry';
import {TicketWindow} from '../UserComp/TicketWindow';
import Contact from '../ContactUs/ContactUs';
import {stringAvatar} from '../Utils/utils';
import {UserProfile} from '../UserComp/UserProfile';
import {OutlinedCard} from './Card/Card';
import PropTypes from 'prop-types';
const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({theme, open}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  // backgroundColor: "red",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  paddingLeft: '2em'
}));

// MenuDrawer
export const LandingPage = ({userData, setAuthenticated, setUserData}) => {
  const theme = useTheme();
  const [cross, setCross] = useState(true);
  const [open, setOpen] = useState(false);
  const [profile, showProfile] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [ticket, showTicket] = useState(false);
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();

  const handleNavigateBlog = () => {
    setAuthenticated(true);
    navigate('/travel-and-explore', {state: {userData}});
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setPostShow(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const showData = () => {
    showTicket(false);
    setPostShow(true);
    setContact(false);
  };
  const showTravel = () => {
    showTicket(true);
    setPostShow(false);
  };

  const showContact = () => {
    showTicket(false);
    setPostShow(false);
    setContact(true);
  };

  const showInitial = () => {
    showTicket(false);
    setPostShow(false);
    setContact(false);
    showProfile(false);
  };

  const handleProfile = () => {
    showTicket(false);
    setPostShow(false);
    setContact(false);
    showProfile(true);
  };

  const handleHome = () => {
    // Or however you handle authentication
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/userLogin');
  };

  return (
    <Box sx={{display: 'flex'}} className="mainWindow">
      <CssBaseline />
      <AppBar position="fixed" open={open} className="menuBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mr: 2, ...(open && {display: 'none'})}}
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={showInitial}>
            <Icon className="logo" style={{width: '60px'}} />
          </Button>
          {/* {userData.properties.setNewsletter && ( */}
          <Button onClick={handleNavigateBlog} style={{color: '#000', margin: '0 5ch 0'}}>
            Blogs
          </Button>
          <Button
            // onClick={handleNavigateTest}
            component="a"
            href="https://shubhamsinha123.github.io/GSAP/#/"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#000', margin: '0'}}
          >
            Testimonial
          </Button>
          {/* )} */}
          <Button onClick={handleHome} className="menuHeader" style={{textDecoration: 'none', color: 'royalblue'}}>
            LogOut
            {/* </Link> */}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: red,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#41e1e1',
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List className="menuItem" style={{textAlign: 'center'}}>
          <ListItemIcon>
            <Tooltip title={userData?.name} TransitionComponent={Zoom} arrow placement="right">
              <Avatar sx={{bgcolor: red[600]}} aria-label="recipe">
                {stringAvatar(userData ? userData?.name : 'User')}
              </Avatar>
            </Tooltip>
            {/* <PersonAddOutlinedIcon /> */}
          </ListItemIcon>
        </List>
        <Divider />
        <List className="menuItem">
          <ListItemButton onClick={handleProfile}>
            <ListItemIcon>
              <PersonAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'My profile'} />
          </ListItemButton>
        </List>
        <Divider />
        <Divider />
        <List className="menuItem">
          {[
            {text: 'Visa Entry', onClick: showData},
            // { text: "Admin", onClick: showAdmin },
            {text: 'Ticket', onClick: showTravel}
            // { text: "Contact", onClick: showContact },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AirplaneTicketOutlinedIcon /> : <SupervisorAccountOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className="menuItem">
          <ListItemButton onClick={showContact}>
            <ListItemIcon>
              <ContactsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Contact Us'} />
          </ListItemButton>
        </List>
        {/* <ListItemText primary={""} /> */}
        <ListItemText style={{textAlign: 'center'}} primary={`Copyright © 2025`} />
        <ListItemText
          style={{textAlign: 'center', paddingBottom: '15rem'}}
          primary={`Deck Digital All right reserved`}
        />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {!postShow ? (
          !ticket ? (
            !contact ? (
              !profile ? (
                <div>
                  <Collapse in={cross}>
                    <Alert
                      severity="info"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setCross(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      This is a single page App. Any refresh will automatically lead to logout. Thanks
                    </Alert>
                  </Collapse>
                  <Typography paragraph>
                    Hello and Welcome to <i>Deck Digital</i>. We are continuously trying to make a better platform for
                    you in order to add your flight booking experience till the accomodation, a very gentile way. Also,
                    with the period of time you are going to stay., We are here to take care these all and updating you
                    all the details in a very ease way. Hope you mantain your trust and will stay and grow together,{' '}
                    <em>Thank You</em>
                  </Typography>
                  <OutlinedCard />
                </div>
              ) : (
                <UserProfile userData={userData} />
              )
            ) : (
              <Contact />
            )
          ) : (
            <TicketWindow userData={userData} setUserData={setUserData} />
          )
        ) : (
          <UserEntry />
        )}
      </Main>
    </Box>
  );
};
LandingPage.propTypes = {
  userData: PropTypes.object.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired
};
