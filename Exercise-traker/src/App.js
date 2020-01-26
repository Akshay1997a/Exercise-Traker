import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import AddExercise from './Components/AddExercise';
import DeleteExercise from './Components/DeleteExercise';
import EditExercise from './Components/EditExercise';
import Exercises from './Components/Exercises';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login}/>
      <Route path="/dashboard/:user" exact component={Dashboard}/>
      <Route path="/dashboard/:user/add" component={AddExercise}/>
      <Route path="/dashboard/:user/delete" component={DeleteExercise}/>
      <Route path="/dashboard/:user/edit" component={EditExercise}/>
      <Route path="/dashboard/:user/exercises" component={Exercises}/>
    </Router>
  );
}

export default App;
