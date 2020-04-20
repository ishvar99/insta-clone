import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom'
const CreatePost=()=>{
  
  const history=useHistory();
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState("")
  useEffect(()=>{
    if(url){
      
    fetch('/post/create',{
      method:'post',
      headers: {
        "Content-Type": "application/json",
        "auth":localStorage.getItem('token')
      },
      body:JSON.stringify({title,body,url})
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
  },[url])
  const postImage=()=>{
    const formData = new FormData();
    formData.append('file',image)
    formData.append('upload_preset','insta-clone')
    formData.append('cloud_name',"do9nfj7z3")
    fetch('https://api.cloudinary.com/v1_1/do9nfj7z3/image/upload',{method:'post',body:formData})
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setUrl(data.secure_url)
      
    })
    .catch((err)=>console.log(err));

  }
    return (
        <div>
        <div className="card input-filled" style={{padding:'20px',width:'75%',maxWidth:'600px',height:'350px',margin:'50px auto',textAlign:'center'}}>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="input-field1" placeholder="Title"/>
            <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} className="input-field1" placeholder="Body"/>
            <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate input-field1" type="text"/>
      </div>
    </div>
    <button onClick={postImage} className="btn-large waves-effect waves-light #42a5f5 blue lighten-1" style={{marginTop:'35px'}} type="submit" name="action">Submit
  </button>
        </div>
        </div>  
    )
}

export default CreatePost