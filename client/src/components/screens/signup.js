import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Signup =()=>{
    const [name,setName]=useState(""); //array destructuring
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    const postData=()=>{
        fetch('/auth/signup',{
            method:'post',
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify({name,email,password})
        }).then((resp)=>{
            return resp.json();
        }).then((data)=>{
            if(data.error){
                M.toast({html: data.error,classes:'#d32f2f red darken-2'})
            }
            else if(data.message){
                M.toast({html: data.message,classes:'#43a047 green darken-1'})
                history.push('/signin')
            }
        })
    }
    return (
        <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" 
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input type="text"
         placeholder="Email"
         value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" 
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light  #42a5f5 blue lighten-1" onClick={postData}>Signup</button>
        <h6><Link to="/signin">Already have an account?</Link></h6>
    </div>
    )
}

export default Signup;