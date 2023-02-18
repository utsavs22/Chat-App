import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { getAllMessagesRoute } from '../utils/APIRoutes';
import Logo from '../assets/logo.png'

function Contacts(props) {
    const { contacts, changeChat, setMessages } = props;
    const currentUsername = sessionStorage.getItem('username')
    const currentUserImage = sessionStorage.getItem('avatar')
    const [currentSelected, setCurrentSelected] = useState(undefined)

    const changeCurrentChat = async(index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
        const resp = await axios.post(getAllMessagesRoute, {
          to: contact._id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
        }
      });
      const data = resp.data;
      // console.log(data.messages)
      setMessages(data.messages);
    }
    return (
        <>
            {
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>ChatOp</h3>
                    </div>

                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUsername}</h2>
                        </div>
                    </div>

                </Container>
            }
        </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #121212;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      /* transition: 0.1s ease-in-out; */
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
    .selected {
      background-color: #f13542;
    }
  }
  .current-user {
    background-color: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts
