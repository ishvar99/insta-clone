import React from 'react';
import Navbar from './components/navbar'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import './App.css';
function App() {
  return (
   <BrowserRouter>
   <Navbar/>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
       </BrowserRouter>
   );
}

export default App;
