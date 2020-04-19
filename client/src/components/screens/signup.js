import React from 'react';
import {Link} from 'react-router-dom';
const Signup =()=>{
    return (
        <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Name"/>
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <button className="btn waves-effect waves-light  #42a5f5 blue lighten-1">Signup</button>
        <h6><Link to="/signin">Already have an account?</Link></h6>
    </div>
    )
}

export default Signup;