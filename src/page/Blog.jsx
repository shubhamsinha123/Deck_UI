/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import {red, green, yellow, blue} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate, useLocation} from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagCircleRoundedIcon from '@mui/icons-material/FlagCircleRounded';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import {
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
  Chip,
  Stack,
  Box,
  Button,
  Zoom,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import axios from 'axios';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import SvgIcon from '@mui/material/SvgIcon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {formattedDate, stringAvatar} from '../Component/Utils/utils';
// import ImagePlaceHolder from "../Compon/ImagePlaceHolder/ImagePlaceHolder";
import ImageLoader from '../Component/ImagePlaceHolder/ImagePlaceHolder';
import {FilterChip} from '../Component/ChipComp/FilterChip';
import ChatModal from '../Component/BlogComp/ChatModal';

/**
 * HomeIcon component renders a home icon using SvgIcon.
 * @param {object} props - The properties passed to the component.
 * @return {JSX.Element} The rendered home icon.
 */
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const ExpandMore = styled((props) => {
  const {...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const theme = createTheme({
  typography: {
    body2: {
      fontStyle: 'italic',
      color: 'black !important'
    }
  }
});

// Blog
export const Blog = () => {
  // const classes = useTheme();
  const [blogGetResp, setBlogGetResp] = useState([]);
  const [showCount, setShowCount] = useState(2);
  const [loadImage, setLoadImage] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  // Flag Data
  const [data, setData] = useState({});
  // dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chatWindowOpen, setChatWindowOpen] = useState(false);
  const [curUser, setCurUser] = useState('');
  // State variable to store the filter criteria
  const [filterName, setFilterName] = useState('');
  const [blogUser, setBlogUser] = useState('');
  // State variable to store the filter color criteria
  const [filterChip, setFilterChip] = useState('');
  const filteredList = blogGetResp.filter((param) => param.country.toLowerCase().includes(filterName.toLowerCase()));

  const location = useLocation();
  const {userData} = location.state || {};

  const currentUser = userData?.name;

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // Flag and country data
  const initialState = Array(blogGetResp.length).fill(false);
  const [toggle, setToggle] = useState(initialState);

  const handleShow = (index) => {
    const newExpandedArray = [...toggle];
    newExpandedArray[index] = !newExpandedArray[index];
    setToggle(newExpandedArray);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  // state for like and unlike
  const [like, setLike] = useState(Array(blogGetResp.length).fill(false));
  const [flag, setFlag] = useState(Array(filteredList.length).fill(false));
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const goBackHome = () => {
    setDialogOpen(true);
  };

  const handleDialogResponse = () => {
    setDialogOpen(false);
    navigate('/userLogin');
  };

  const handleChatOpen = (name, chat) => {
    setChatWindowOpen(true);
    setChatMessages(chat);
    setCurUser(currentUser);
    setBlogUser(name);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLike = (index) => {
    const newLikes = [...like];
    newLikes[index] = !newLikes[index];
    setLike(newLikes);

    // Count the number of liked items
    // const numberOfLikes = newLikes.filter((liked) => liked).length;
    // log(`Number of liked items: ${numberOfLikes}`);
    // const numberOfLikesObj = newLikes.filter((liked) => liked);
    // const likedObjects = filteredList?.filter((item, i) => newLikes[i]);
    // log('Liked Objects:', likedObjects);
    // If you need to remove the object when unliked
    // if (!newLikes[index]) {
    // const updatedFilteredList =
    // filteredList.filter((item, i) => i !== index);
    // log(updatedFilteredList);
    // Do something with the updatedFilteredList, such as updating the state
    // setFilteredList(updatedFilteredList);
    // }
  };
  // const handleLike = (index) => {
  //   const likedObj = [...blogGetResp];
  //   console.log(likedObj[index]);
  //   const newLikes = [...like];
  //   newLikes[index] = !newLikes[index];
  //   setLike(newLikes);
  // };
  const handleFlag = (index) => {
    const newFlag = [...flag];
    newFlag[index] = !newFlag[index];
    setFlag(newFlag);
  };

  const handleFilterChange = (event) => {
    setFilterName(event);
    setFilterChip(event);
  };

  const filterChips = [
    {label: data.my, value: 'Malaysia', color: 'secondary'},
    {label: data.gb, value: 'United Kingdom', color: 'warning'},
    {label: data.us, value: 'United States', color: 'primary'},
    {label: data.in, value: 'India', color: 'error'},
    {label: data.jp, value: 'Japan', color: 'success'}
  ];

  // count function for show more show less
  const handleShowMore = () => {
    // Increase the number of items to display by 4
    setShowCount(showCount + 2);
  };

  const handleShowLess = () => {
    // Decrease the number of items to display first 2
    setShowCount(2);
  };

  useEffect(() => {
    // Fetch the JSON data from the API URL
    fetch('https://flagcdn.com/en/codes.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Calling GET End point
  /**
   * Fetches blog data from the server.
   * This function makes an asynchronous
   * GET request to the '/getBlog' endpoint
   * using axios. Upon a successful response, it updates the state with the
   * retrieved data. If an error occurs during the request, it logs the error
   * message to the console.
   * @async
   * @function fetchData
   * @return {Promise<void>} A promise that resolves
   *  when the data fetching is complete.
   */
  async function fetchData() {
    try {
      const response = await axios.get('/getBlog');
      setBlogGetResp(response.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoadImage(true);
    }, 2000);

    // Clear the timeout if the component unmounts
    //  or if the image loads before the delay
    return () => clearTimeout(delay);
  }, []);

  console.log(blogGetResp, 'blogGetResp');
  console.log(filteredList, 'filteredList');
  console.log(filterName, 'filterName');
  console.log(filterChip, 'filterChip');
  return (
    <div className="blogPageMain">
      {chatWindowOpen && (
        <ChatModal
          open={chatWindowOpen}
          setOpen={setChatWindowOpen}
          messages={chatMessages}
          setMessages={setChatMessages}
          curUser={curUser}
          blogUser={blogUser}
          apiCall={fetchData}
        />
      )}
      <Box style={{marginLeft: '22%', paddingTop: '5.5%'}}>
        <Stack direction="row" spacing={1} style={{}}>
          <FilterChip
            filterChips={filterChips}
            filterChip={filterChip}
            listData={blogGetResp}
            handleFilterChange={handleFilterChange}
            setFilterChip={setFilterChip}
            setFilterName={setFilterName}
          />
          <Chip
            style={{width: '15ch', height: '5ch', fontSize: '2ch'}}
            label="Display All"
            size="small"
            color="default"
            avatar={<Avatar>{filteredList?.length}</Avatar>}
            onDelete={() => handleFilterChange('')}
            onClick={() => handleFilterChange('')}
            deleteIcon={<DeleteIcon />}
          />
          <Tooltip title="Home" TransitionComponent={Zoom} arrow placement="top">
            <Button onClick={goBackHome}>
              <HomeIcon sx={{fontSize: 40}} color="success" />
            </Button>
          </Tooltip>
          {/* <Chip
            style={{ width: "15ch", height: "5ch", fontSize: "2ch" }}
            label="Home"
            size="small"
            color="info"
            onClick={goBackHome}
          /> */}
        </Stack>
        <Typography variant="h3">Welcome to our Blog page</Typography>
      </Box>
      <React.Fragment>
        {filteredList.slice(0, showCount).map((param, index) => {
          const {name, date, description, image, viewCount, moreDesc, flagIcon, city, chat} = param;
          const newDate = formattedDate(date);
          return (
            <Card className="imageCardNew" key={index}>
              <CardHeader
                avatar={
                  <Avatar sx={{bgcolor: yellow[600]}} aria-label="recipe">
                    {stringAvatar(name)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" aria-haspopup="true" onClick={() => handleFlag(index)}>
                    {flag[index] ? (
                      <>
                        <Tooltip title="Remove flag">
                          <FlagCircleRoundedIcon sx={{color: green[500]}} />
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip title="Flag">
                        <TourOutlinedIcon />
                      </Tooltip>
                    )}
                  </IconButton>
                }
                title={name}
                subheader={newDate}
              />
              {loadImage ? (
                <CardMedia
                  className="image-cardmedia"
                  component="img"
                  height="300"
                  width="100 !important"
                  style={{objectFit: 'contain !important'}}
                  loading="lazy"
                  image={image}
                  alt="Paella dish"
                />
              ) : (
                <ImageLoader />
              )}
              <CardContent>
                <ThemeProvider theme={theme}>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </ThemeProvider>
              </CardContent>
              <CardActions disableSpacing>
                <img src={flagIcon} alt="Malaysia" />
                <Typography variant="overline" style={{marginLeft: '1ch'}}>
                  {city}
                </Typography>
                <IconButton aria-label="like" onClick={() => handleLike(index)}>
                  {like[index] ? (
                    <FavoriteIcon sx={{color: red[500]}} />
                  ) : (
                    <Tooltip title="Like">
                      <FavoriteIcon />
                    </Tooltip>
                  )}
                </IconButton>
                <IconButton
                  aria-label="share"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton onClick={() => handleChatOpen(name, chat)}>
                  <WhatsAppIcon />
                  {chat.length > 0 && chat.length}
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <Grid container spacing={2} className="gridSocial">
                    <Grid item xs={3}>
                      <Tooltip title="Instagram" TransitionComponent={Zoom} placement="top">
                        <MenuItem onClick={handleClose}>
                          <InstagramIcon sx={{color: red[500]}} />
                        </MenuItem>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                      <Tooltip title="X (Twitter)" TransitionComponent={Zoom} placement="top">
                        <MenuItem onClick={handleClose}>
                          <XIcon />
                        </MenuItem>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                      <Tooltip title="Whatsapp" TransitionComponent={Zoom} placement="top">
                        <MenuItem onClick={handleClose}>
                          <WhatsAppIcon sx={{color: green[500]}} />
                        </MenuItem>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3}>
                      <Tooltip title="Facebook" TransitionComponent={Zoom} placement="top">
                        <MenuItem onClick={handleClose}>
                          <FacebookIcon sx={{color: blue[500]}} />
                        </MenuItem>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Menu>
                {moreDesc && (
                  <ExpandMore
                    expand={toggle[index]}
                    onClick={() => handleShow(index)}
                    aria-expanded={toggle[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                )}
                <Tooltip title="Views">
                  <AutoGraphIcon color="success" />
                </Tooltip>
                {viewCount}k
              </CardActions>
              <Collapse in={toggle[index]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{moreDesc}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
        {/* <Dialog
          open={dialogOpen}
          // style={{ width: "55rem" }}
          onClose={handleDialogClose}
        >
          <DialogTitle style={{ width: "55rem" }}>Comments </DialogTitle>
          <DialogContent>
            <DialogContentText>
              you can expect multiple updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add your comments"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Add</Button>
          </DialogActions>
        </Dialog> */}
        ;
        {showCount < filteredList.length ? (
          <Button className="buttonAlignment" color="warning" variant="contained" onClick={handleShowMore}>
            Show more
          </Button>
        ) : (
          <Button className="buttonAlignment" color="success" variant="contained" onClick={handleShowLess}>
            Show less
          </Button>
        )}
        <Dialog
          fullScreen={fullScreen}
          open={dialogOpen}
          // onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{minWidth: '7rem'}}>
            {'You are going to logged out.....'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* This will lead to logout. Are you sure! */}
              {`With time, we will grow more. Thanks for comming up and showing
              interest to our latest blogs.
              Keep searching the same, Bye :) `}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogResponse}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            >
              Home
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};
