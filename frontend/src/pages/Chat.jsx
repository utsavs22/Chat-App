import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { fetchAllUsersRoute } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Hello from '../components/Hello'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'
import { host } from '../utils/APIRoutes';

function Chat() {
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  

  const fetchAllUsers = async () => {
    const resp = await axios.get(fetchAllUsersRoute, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
      }
    });

    setContacts(resp.data);
  }

  useEffect(() => {
    fetchAllUsers();
    socketRef.current = io(host);
    socketRef.current.emit("add-user", sessionStorage.getItem('username'))
    console.log(messages)
  }, [messages])

  const changeChat = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>
      <div className="containerr">
        <Contacts contacts={contacts} changeChat={changeChat} setMessages={setMessages}/>
        {
          currentChat === undefined ? 
          <Hello/>
          :
          <ChatContainer currentChat={currentChat} messages = {messages} setMessages={setMessages} socketRef = {socketRef}/>
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
 height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #121212;
  .containerr {
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
