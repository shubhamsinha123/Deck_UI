/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';
import {
  CssBaseline,
  Button,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Alert,
  Typography
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {styled} from 'styled-components';
// import flight from "../files/flight.jpg";
import flight from '../../files/window-view.jpg';
import {send} from 'emailjs-com';

/**
 * Copyright component to display the copyright information.
 * @param {object} props - The properties passed to the component.
 * @return {JSX.Element} The rendered component.
 */
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

// contactUs
function Contact() {
  const [status, setStatus] = useState({message: '', severity: ''});
  const [sender_name, set_sender_name] = useState('');
  const [sender_email, set_sender_email] = useState('');
  const [sender_message, set_sender_message] = useState('');

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({message: '', severity: ''});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleName = (e) => {
    set_sender_name(e.target.value);
  };
  const handleEmail = (e) => {
    set_sender_email(e.target.value);
  };
  const handleMessage = (e) => {
    set_sender_message(e.target.value);
  };
  const sendMail = (e) => {
    e.preventDefault();
    send(
      // gmail service id
      'service_5ucez7e',
      // template id
      'template_96pvcem',
      {sender_name, sender_email, sender_message},
      // user_id
      'htNbILA46JBpjwWnB'
    )
      .then(() => {
        // alert('message sent successfully', response.status, response.text)
        setStatus({
          message: 'Message sent successfully',
          severity: 'success'
        });
        set_sender_name('');
        set_sender_email('');
        set_sender_message('');
      })
      .catch((err) => {
        setStatus({
          message: `Failed to send message ${err}`,
          severity: 'error'
        });
      });
  };
  return (
    <Section id="contact">
      <div className="contact">
        <div className="contact__title">
          <p>Stay in touch with us </p>
          <h2>Quick Contact</h2>
        </div>
        <ThemeProvider theme={theme}>
          <Grid container component="main" className="contact__main" sx={{height: '100vh'}}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${flight})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                  <LockOutlinedIcon />
                </Avatar>
                <Box component="form" onSubmit={sendMail} sx={{mt: 1}}>
                  {status.message && (
                    <Alert onClose={() => setStatus({message: '', severity: ''})} severity={status.severity}>
                      {status.message}
                    </Alert>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    onChange={handleName}
                    name="name"
                    value={sender_name}
                    autoComplete="name"
                    // autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmail}
                    value={sender_email}
                    autoComplete="email"
                    // autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    type="name"
                    onChange={handleMessage}
                    value={sender_message}
                    id="Message"
                    autoComplete="Message"
                    multiline
                  />
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                  <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                    Send
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      {/* <RouterLink to='/' variant="body2">
                        Any problem?
                      </RouterLink> */}
                    </Grid>
                  </Grid>
                  <Copyright sx={{mt: 5}} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </Section>
  );
}

const Section = styled.section`
  min-height: 56vh;
  .contact {
    color: var(--primary-color);
    margin: 0 15rem;
    &__title {
      p {
        text-transform: uppercase;
        color: var(--primary-color);
      }
      h2 {
        font-size: 2rem;
        color: var(--secondary-color);
      }
    }
    &__main {
      height: 56vh !important;
      &__data {
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        gap: 4rem;
        &__description {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          h4 {
            font-size: 1.5rem;
          }
          p {
            text-align: justify;
            margin-top: 20px;
          }
          div {
            p {
              strong {
                text-transform: uppercase;
              }
            }
          }
        }
        &__form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          input,
          textarea {
            text-transform: uppercase;
            border: none;
            border-bottom: 0.1rem solid var(--secondary-color);
            width: 100%;
            color: var(--secondary-color);
            padding-bottom: 0.7rem;
            &:focus {
              outline: none;
            }
            &::placeholder {
              color: var(--secondary-color);
            }
          }
          textarea {
            width: 100%;
            height: 50%;
            resize: none;
          }
          button {
            width: 100%;
            background-color: transparent;
            border: 0.1rem solid var(--secondary-color);
            height: 3rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            cursor: pointer;
            transition: 0.5s ease-in-out;
            &:hover {
              background-color: var(--secondary-color);
              color: #fff;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .contact {
      margin: 1rem;
      padding: 0 1rem;
      &__title {
        margin: 0;
        text-align: center;
        p {
          font-size: 0.8rem;
        }
        h2 {
          font-size: 1.3rem;
        }
      }
      &__data {
        grid-template-columns: 1fr;
        margin: 0;
        p {
          text-align: left;
        }
        &__form {
          button {
            height: 6rem;
          }
        }
      }
    }
  }
`;

export default Contact;
