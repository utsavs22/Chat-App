import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Avatar from './components/Avatar'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute, ChatProtectedRoute, LoginSignupProtectedRoute } from './utils/ProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/login" element = {<LoginSignupProtectedRoute component = {Login}/>}/>
          <Route path = "/signup" element = {<LoginSignupProtectedRoute component = {Signup}/>}/>
          
          <Route path = "/" element = {<ChatProtectedRoute component = {Chat}/>}/>
          <Route path = "/setAvatar" element = {<ProtectedRoute component = {Avatar}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
