import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Login =()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    const postData=()=>{
        fetch('/auth/signin',{
            method:'post',
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify({email,password})
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            if(data.error){
                M.toast({html: data.error,classes:'#d32f2f red darken-2'})
            }
            else if(data.message){
                M.toast({html: data.message,classes:'#43a047 green darken-1'})
                history.push('/')
            }
        })
    }
    return (
                  <div className="card auth-card input-field">
                      <h2>Instagram</h2>
                      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                      <button onClick={postData} className="btn waves-effect waves-light  #42a5f5 blue lighten-1">Login </button>
                      <h6><Link to="/signup">Don't have an account?</Link></h6>
                  </div>
    )
}

export default Login;