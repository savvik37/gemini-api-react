import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { AuthProvider } from './context/AuthProvider.js';
import AuthContext from './context/AuthProvider.js';
import SignUp from "./signup.js"
import Login from './login.js';
import Home from './home.js'

const App = () => {

  const { auth } = useContext(AuthContext);

  return (
    <div class="app">
      {auth?.user? (
        <>
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>

      )}
    </div> 
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);