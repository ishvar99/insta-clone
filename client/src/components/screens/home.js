import React from 'react';

const Home =()=>{
    return (
        <div >
            <div className="card my-card">
                <div style={{display:'flex',padding:'20px 0 10px 10px',borderBottom:'1px solid lightgrey'}} className="card-image">
        
                    <img className="img" src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555924665/shape/mentalfloss/459405241.jpg"/>
                
                    <strong style={{marginTop:'7px'}}><span>Ishan</span></strong>
                </div>
                <div>
                    <img  style={{width:'100%',height:'350px'}} src="https://bit.ly/3aiFSBu"/>
                </div>
                <div className="card-content">
                    <strong><span>Sunset</span></strong>
                    <p>This is amazing view of sunset</p>
                    <br/>
                    <input className="input-field1" type="text" placeholder="Add a comment..."/>
                </div>
                
            </div>
        </div>
        
    )
}

export default Home;