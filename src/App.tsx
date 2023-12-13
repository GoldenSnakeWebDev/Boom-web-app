import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/authentication/login';
import { Register } from './pages/authentication/register';
import { HomePage } from './pages/home/homepage';
import { CreateNewPost } from './pages/newPost/create_new_post';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/newpost' element={<CreateNewPost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
