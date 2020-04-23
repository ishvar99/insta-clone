import React,{useState,useEffect} from 'react';
import LikeButton from '../LikeButton/likeButton'
import $ from 'jquery'
const Home =()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        $(document).ready(function() {
            
            $(".post-image").dblclick(function() {

                var heart = $(this).find("i");

                heart.fadeIn("slow");

                setTimeout(function() {
                    heart.fadeOut("slow");
                }, 700);
            });
        });
    })
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
    const updateLikeStatus=(postId,fav)=>{
        console.log(postId);
        fetch('/post/like',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
            body:JSON.stringify({postId,fav})
        }).then((res=>res.json()))
        .then((result)=>{
            const newData= data.map((item)=>{
                if(result._id===item._id)
                    return result;
                else 
                    return item;
            })
            setData(newData);
        })
    }
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
                <div className="post-image">
                <i class="large material-icons">favorite</i>
                    <img  style={{width:'100%',height:'350px'}} src={item.photo}/>
                    
                </div>
                
                <div className="card-content">
                    <div>
                        <LikeButton onClick={()=>console.log('CLICKED')}></LikeButton>
                    {/* <i onClick={()=>updateLikeStatus(item._id,!item.isLiked)} className="material-icons like" style={{color:"#ED4956"}}>{item.isLiked?'favorite':'favorite_border'}</i> */}
                        </div>
                
                    <strong><span style={{paddingLeft:'12px'}}>{item.title}</span></strong>
                    <p style={{paddingLeft:'12px'}}>{item.body}</p>
                    <br/>
                    <input style={{paddingLeft:'12px'}} className="input-field1" type="text" placeholder="Add a comment..."/>
                </div>
             
            </div>
             )
            })
            
            }
             
        </div>
        
    )
}

export default Home;