import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './pages/login';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route path='/' Component={Login}/>
      </div>
    </Router>
  );
}

export default App;
