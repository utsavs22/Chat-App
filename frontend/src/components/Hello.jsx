import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Hello() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(sessionStorage.getItem('username'))
    }, []);

    return (
        <Container>
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #f13542;
  }
`;

export default Hello
