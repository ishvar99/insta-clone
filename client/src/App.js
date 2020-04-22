import React,{createContext,useReducer, useEffect, useContext} from 'react';
import Navbar from './components/navbar'
import {BrowserRouter,Route,useHistory,Switch} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createPost';
import {userReducer} from './reducers/userReducer'
import {initialState} from './reducers/userReducer'
import './App.css';
export const UserContext=createContext();

const Routing =()=>{
  const history=useHistory();
const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch({type:'USER',payload:user});
    }
    else
    history.push('/signin')
  },[])
  return (
    <Switch>
  <Route exact path="/" >
  <Home />
  </Route>
  <Route path="/signin">
    <Login />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route path={state?"/profile":"/signin"}>
    <Profile />
  </Route>
  <Route path="/create-post">
    <CreatePost />
  </Route>
  </Switch>);
}
function App() {
  const [state,dispatch]=useReducer(userReducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
   <BrowserRouter>
   <Navbar/>
      <Routing/>
       </BrowserRouter>
       </UserContext.Provider>
   );
}

export default App;
