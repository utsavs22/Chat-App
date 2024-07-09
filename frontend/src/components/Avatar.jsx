import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

function Avatar() {

  const [avatar, setAvatar] = useState(undefined);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePic = async () => {
    if (avatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      // console.log(avatar);
      const resp = await axios.post(setAvatarRoute, {
          image: avatar,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)
        }
      }) ;

      const data = resp.data;
      // console.log(data)
      if (data.isSet)  {
        sessionStorage.setItem('isAvatarImageSet','true');
        sessionStorage.setItem('avatar',avatar);
        navigate("/");
      }
      else toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  const fetchData = async () => {
    const image = await axios.get(
      `${process.env.REACT_APP_AVATAR_API}/${Math.random() * 1000}`
    );
    const buffer = new Buffer(image.data);
    setAvatar(buffer.toString("base64"));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // console.log(sessionStorage.getItem('isAvatarImageSet'))
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>

          <div className="title-container">
            <h1>Choose your Avatar</h1>
          </div>

          <div className="avatars">
                <div className="avatar selected">
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                  />
                </div>
          </div>

          <button onClick={fetchData} className="submit-btn">
            Regenerate Avatar 😎
          </button>

          <button onClick={setProfilePic} className="submit-btn">
            Set as Profile Picture
          </button>

          <ToastContainer />

        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #121212;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #f13542;
    }
    .avatar:hover {
      cursor: pointer;
    }
  }
  .submit-btn {
    background-color: #f13542;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #d52834;
    }
  }
`;

export default Avatar;
