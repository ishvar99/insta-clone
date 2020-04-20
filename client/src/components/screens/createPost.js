import React,{useState} from 'react';

const CreatePost=()=>{
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState("")
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
      fetch('/post/create',{
        method:'post',
        body:JSON.stringify({title,body,url})
      }).then((res)=>{
        return res.json()
      }).then((data)=>{
        console.log(data);
      })
    })
    .catch((err)=>console.log(err))
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