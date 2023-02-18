import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Fragment> <Component {...props} /> </Fragment> : <Navigate to="/login" />
  );
};

export const LoginSignupProtectedRoute = ({ component: Component, ...props }) => {

  return (
    sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY) ? <Navigate to="/" /> : <Fragment> <Component {...props} /> </Fragment>
  );
};

export const ChatProtectedRoute = ({ component: Component, ...props }) => {

  if (sessionStorage.getItem(process.env.REACT_APP_CLIENT_KEY)) {

    if (sessionStorage.getItem('isAvatarImageSet') === 'true') return <Fragment> <Component {...props} /> </Fragment>
    else return <Navigate to="/setAvatar" />

  }
  else {
    return <Navigate to="/login" />
  }

};



