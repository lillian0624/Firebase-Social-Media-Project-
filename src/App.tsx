import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="665023975238-ateqcnf8nttn46loh7ug4206i57ijdn8.apps.googleusercontent.com.apps.googleusercontent.com">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
