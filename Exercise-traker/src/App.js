import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Router>
  );
}

export default App;
