import React from 'react';

const CreatePost=()=>{
    return (
        <div>
        <div className="card input-filled" style={{padding:'20px',width:'75%',maxWidth:'600px',height:'350px',margin:'50px auto',textAlign:'center'}}>
            <input type="text" className="input-field1" placeholder="Title"/>
            <input type="text" className="input-field1" placeholder="Body"/>
            <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" multiple/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate input-field1" type="text"/>
      </div>
    </div>
    <button class="btn-large waves-effect waves-light #42a5f5 blue lighten-1" style={{marginTop:'35px'}} type="submit" name="action">Submit
  </button>
        </div>
        </div>  
    )
}

export default CreatePost