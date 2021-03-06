import React,{useContext, useReducer} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar=()=>{
  const {state,dispatch}=useContext(UserContext);
  const history=useHistory()
  const logout=()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/signin')
  }
  
  const renderList=()=>{
    if(state)
      return [<li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create-post">Create Post</Link></li>,<a onClick={logout} class="waves-effect waves-light  #42a5f5 blue lighten-1 btn-small">Logout</a>]
    else
      return [<li><Link to="/signin">Signin</Link></li>,
      <li><Link to="/signup">Signup</Link></li>]
  }
    return (
        <nav>
    <div className="nav-wrapper white" style={{paddingLeft:'15px'}}>
      <Link to={state?"/":"/signin"} className="brand-logo">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {renderList()}    
      </ul>
    </div>
  </nav>
    );
}

export default Navbar