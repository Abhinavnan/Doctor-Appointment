import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './Components/Contents/Home/Home';
import Login from './Components/Login';
import Header from './Components/Header';
import Appointments from './Components/Contents/Appoinments/Appointments';
import './App.css'

function App() {
  const login = useSelector(state => state.authDetails).login;

  return (
    <Router>
    {login && <Header />}
      <Routes>
        <Route path="/" element={ login ? <Home /> : <Login />} />
        <Route path="/appointments/:day" element={ login ? <Appointments /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
