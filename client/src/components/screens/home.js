import React,{useState,useEffect} from 'react';
const Home =()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetch('/post',{
            headers:{
                'auth':localStorage.getItem('token')
            }
        }).then((res)=>res.json())
        .then((result)=>{
            setData(result.posts);
        })
    },[])
    return (
        <div >
            {
         data.map((item)=>{
             return(
                <div className="card my-card" key={item._id}>
                <div style={{display:'flex',padding:'20px 0 10px 10px',borderBottom:'1px solid lightgrey'}} className="card-image">
        
                    <img className="img" src={item.photo}/>
                
                    <strong style={{marginTop:'7px'}}><span>{item.postedBy.name}</span></strong>
                </div>
                <div>
                    <img  style={{width:'100%',height:'350px'}} src={item.photo}/>
                </div>
                <div className="card-content">
                    <strong><span>{item.title}</span></strong>
                    <p>{item.body}</p>
                    <br/>
                    <input className="input-field1" type="text" placeholder="Add a comment..."/>
                </div>
                
            </div>
             )
            })
            }
        </div>
        
    )
}

export default Home;