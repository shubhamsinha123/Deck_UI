import React, {useState, useRef, useEffect} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PropTypes from 'prop-types';

const ChatModal = ({open, setOpen, messages, setMessages, curUser, blogUser, apiCall}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setNewMessage('');
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        text: newMessage,
        sender: curUser,
        timestamp: new Date().toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      const payLoad = {chat: [...messages, newMessageObject]};
      const url = `${process.env.REACT_APP_API_BASE_URL}/updateBlog/${blogUser}`;
      // Call the PATCH API to add the new message
      try {
        const response = await axios.patch(url, payLoad);

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const updatedMessage = response.data.data;

        // Update the state with the new message
        setMessages(updatedMessage?.chat);

        if (apiCall) {
          apiCall();
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }

      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Chat
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!messages?.length && (
            <>
              <div className="chatImage" />
              <Typography variant="subtitle1" align="center" sx={{color: 'text.secondary'}}>
                No messages yet. Start the conversation!
              </Typography>
            </>
          )}
          <Box sx={{height: 300, overflowY: 'auto', marginBottom: 2}}>
            <List>
              {messages?.map((message, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={message.text}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          display: 'block',
                          textAlign: 'right',
                          color: 'text.secondary'
                        }}
                      >
                        {`${message.sender}, ${message.timestamp}`}
                      </Typography>
                    }
                    sx={{
                      backgroundColor: '#e5eff0',
                      padding: '8px',
                      borderRadius: '8px',
                      maxWidth: '80%',
                      wordWrap: 'break-word'
                    }}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          <TextField
            fullWidth
            label="Type a message"
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChatModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  messages: PropTypes.array,
  setMessages: PropTypes.func,
  curUser: PropTypes.string,
  blogUser: PropTypes.string,
  apiCall: PropTypes.func
};

export default ChatModal;
