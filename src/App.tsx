import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/authentication/login';
import { Register } from './pages/authentication/register';
import { HomePage } from './pages/home/homepage';
import { CreateNewPost } from './pages/newPost/create_new_post';
import { DirectMessage } from './pages/direct_message/DirectMessage';
import { EditProfile } from './pages/edit-profile/EditProfile';
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
          <Route path='/direct_message' element={<DirectMessage/>}/>
          <Route path='/edit_profile' element={<EditProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
