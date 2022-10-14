import { Fragment, useRef, useEffect, useState, } from 'react';
import { Grid, List, ListItem, ListItemText, TextField, FormControl, IconButton, Box, Link } from "@mui/material";
import { ChatMessageDto } from '../../model/ChatMessageDto';
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function Chat({ jwtToken, loggedInUser }) {

    const ENTER_KEY_CODE = 13;

    const [isShown, setIsShown] = useState(false);
    const scrollBottomRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [friends, setFriends] = useState([]);

    const ws = useRef(null);

    const apiFriends = axios.create({
        baseURL: "http://localhost:8080/friendship",
        headers: { Authorization: `Bearer ${jwtToken}` }
    })

    useEffect(() => {
        apiFriends.get(`/friends/${loggedInUser.id}`).then(res => {
            setFriends(res.data);
            console.log(jwtToken)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        apiFriends.get(`/friends/${loggedInUser.id}/${name}`).then(res => {
            console.log(res.data)
            setFriends(res.data);
            console.log(friends)
        }).catch(err => {
            console.log(err)
            setFriends([])
        })
    }, [name])

    const handleMessageChange = (event) => { setMessage(event.target.value); }
    const handleEnterKey = (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            sendMessage();
        }
    }

    const toggleChat = () => {
        setIsShown(current => !current);
    };

    useEffect(() => {
        if (!isShown) return;
        ws.current = new WebSocket(`ws://localhost:8080/chat?access-token=${jwtToken}`);
        ws.current.onopen = () => {
            console.log("ws open:", ws.current.readyState);
        }
        ws.current.onclose = () => {
            console.log("ws closed");
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [isShown]);

    useEffect(() => {
        if (!ws.current) {
            console.log("websocket connection not open")
            return;
        }
        ws.current.onmessage = e => {
            const chatMessageDto = JSON.parse(e.data);
            console.log('Message: ', chatMessageDto);
            setChatMessages([...chatMessages, {
                userID: chatMessageDto.userID,
                message: chatMessageDto.message
            }]);
        };
    });

    useEffect(() => {
        scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages])

    const sendMessage = () => {
        if (message) {
            ws.current.send(
                JSON.stringify(new ChatMessageDto(message, loggedInUser.name))
            );
            setMessage('');
        }
    }

    const listFriends = friends.map((FriendDto, index) =>
        <ListItem key={index} >
            <Link href={`http://localhost:8081/profile/${FriendDto.name}`}>
                <ListItemText primary={`${FriendDto.name}`} />
            </Link>
        </ListItem >);

    const listChatMessages = chatMessages.map((chatMessageDto, index) =>
        <ListItem key={index} >
            <ListItemText className={loggedInUser.name === chatMessageDto.userID ? 'message' : 'message received'}
                id="chat-window-messages" primary={`${chatMessageDto.userID}: ${chatMessageDto.message}`} />
        </ListItem >
    );

    return (
        <Fragment>
            <>
                <button
                    onClick={toggleChat}
                    style={{ position: "fixed", bottom: 10, float: "right", right: 10 }}
                    className="btn btn-dark mb-5 me-5"
                    type="submit"
                >
                    Chat
                    <span className="position-absolute top-0 start-0 translate-middle p-2 bg-danger border border-light rounded-circle mt-1 ms-1">
                        <span className="visually-hidden">New alerts</span>
                    </span>
                </button>
                <div id="chat-container" className="chat-container" style={{ display: isShown ? 'block' : 'none' }}>
                    <div className="center">
                        <div className="contacts">
                            <h2>Your Friends!</h2>

                            <form className="d-flex me-auto" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search for a friend"
                                    onInput={(e) => setName(e.target.value)} value={name} />
                            </form>
                            <List className="contact-container">
                                {listFriends}
                                <ListItem ref={scrollBottomRef} />
                            </List>
                        </div>
                        <Box className="chat">
                            <Grid className="messages" alignItems="center" id="chat">
                                <Grid id="chat-window">
                                    <List id="chat-window-messages">
                                        {listChatMessages}
                                        <ListItem ref={scrollBottomRef} />
                                    </List>
                                </Grid>

                            </Grid>
                            <Grid className='input' container spacing={2}>
                                <Grid xs={10} item>
                                    <FormControl>
                                        <TextField onChange={handleMessageChange}
                                            onKeyDown={handleEnterKey}
                                            value={message}
                                            label="Type your message..."
                                            variant="outlined" />
                                    </FormControl>
                                </Grid>
                                <Grid xs={2} item>
                                    <IconButton onClick={sendMessage}
                                        aria-label="send" color="primary">
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </>
        </Fragment >
    )
}