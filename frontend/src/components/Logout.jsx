import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {BiLogOutCircle} from 'react-icons/bi'


function Logout() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        sessionStorage.removeItem(process.env.REACT_APP_CLIENT_KEY);
        sessionStorage.removeItem('isAvatarImageSet');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('email');
        navigate('/login')
    }
  return (
    <Button onClick={handleOnClick}>
    <BiLogOutCircle/>
  </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 1.5rem;
  background-color: #f13542;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout
