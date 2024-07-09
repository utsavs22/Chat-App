import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import { sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid';

function ChatContainer({ currentChat, messages, setMessages, socketRef }) {
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef();


  const sendMessage = async(msg) => {
    // alert(msg)
    const resp = await axios.post(sendMessageRoute, {

        to: currentChat._id,
        message:msg
      
    }, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
      }
    }) ;

    socketRef.current.emit("send-msg", {
      to: currentChat.username,
      from: sessionStorage.getItem('username'),
      message: msg,
    });

    setMessages(messages.concat([{fromSelf: true, message:msg}]))

  }

  useEffect(() => {
    if(socketRef.current){
      socketRef.current.on("msg-recieve", (msg) => {
        console.log(msg)
        setArrivalMessage({fromSelf: false, message: msg});
      } )
    }
  },[socketRef.current])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  },[arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  }, [messages])

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
              {
                messages.map((msg) => {
                    return (
                      <div ref = {scrollRef} key={uuidv4()} >
                        <div className={`message  ${msg.fromSelf ? "sent":"recieved"}`}>
                          <div className="content">
                            <p >
                                {msg.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                })
              }
            </div>
            <ChatInput sendMessage = {sendMessage} />

        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer
