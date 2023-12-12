import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/authentication/login';
import { Register } from './pages/authentication/register';
import { HomePage } from './pages/homepage/homepage';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
