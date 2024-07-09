import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'


function ChatInput({ sendMessage }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");

    const handleOnChange = (e) => {
        setMessage(e.target.value)

    }
    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (emojiData, e) => {
        setMessage(message + emojiData.emoji)
    }

    const sendChat = (e) => {
        e.preventDefault();
        setShowEmojiPicker(false)
        if (message.length > 0) {
            sendMessage(message)
            setMessage('');
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker} />
                    {
                        showEmojiPicker && <Picker Theme="dark" className='emoji-picker-react' onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={sendChat}>
                <input type="text" placeholder='type message here' value={message} onChange={handleOnChange} />
                <button type='submit' className="submit" >
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #0c0c0c;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      /* EmojiPickerReact */
      .EmojiPickerReact {   
        position: absolute;
        top: -500px;
        background-color: #121212;
        box-shadow: 0 5px 10px #f13542;
        border-color: #f13542;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #121212;
          width: 5px;
          &-thumb {
            background-color: #f13542;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .epr-emoji-category-label{
            color: wheat;
            background-color:#121212 ;
        }
        .epr-search {
          background-color: transparent;
          border-color: #f13542;
        }
        .emoji-group:before {
          background-color: #121212;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      background-color: #f13542;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput
