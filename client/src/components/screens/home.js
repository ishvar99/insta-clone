import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import $ from 'jquery'
const Home =()=>{
    const {state,dispatch}=useContext(UserContext);
    const [data,setData]=useState([]);
    const [comment,setComment]=useState("");
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
            console.log(result)
            setData(result.posts);
        })
    },[])
    const postLikedStatus=(likes)=>{
        if(likes.includes(state._id)){
            return true;
        }
            else 
            return false;
    }
    const updateLikeStatus=(postId,fav)=>{
        if(fav){
            fetch('/post/unlike',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'auth':localStorage.getItem('token')
                },
                body:JSON.stringify({postId})
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
            return;
        }
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
    const postComment=(postId)=>{
        fetch('/post/comment',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth':localStorage.getItem('token')
            },
            body:JSON.stringify({postId,comment})
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
             const likeStatus=postLikedStatus(item.likes);
             return(
                <div className="card my-card" key={item._id}>
                <div style={{display:'flex',padding:'20px 0 10px 10px',borderBottom:'1px solid lightgrey'}} className="card-image">
        
                    <img className="img" src={item.photo}/>

                    <strong style={{marginTop:'7px'}}><span>{item.postedBy.name}</span></strong>
                </div>
                <div className="post-image">
                    <i class="large material-icons">favorite</i>
                    <img onDoubleClick={()=>updateLikeStatus(item._id,false)} style={{width:'100%',height:'350px'}} src={item.photo}/>
                </div>
                
                <div className="card-content">
                    <div style={{display:'flex'}}>
                        <i style={likeStatus?{color:'#E2264D',padding:'8px 5px 0 10px',fontSize:'27px'}:{fontSize:'27px',padding:'8px 5px 0 8px'}} onClick={()=>updateLikeStatus(item._id,likeStatus)} class="material-icons">{likeStatus?'favorite':'favorite_border'}</i>
                        <i style={{marginTop:'10px',fontSize:'23px',paddingRight:'13px',paddingLeft:'9px'}} class="far fa-comment"></i>
                        <i style={{marginTop:'9px',fontSize:'27px'}} class="fab fa-telegram-plane"></i>
                        </div>
                    <div style={{paddingLeft:'13px',marginTop:'5px'}}><strong><span>{item.likes.length==1?item.likes.length+' like':item.likes.length +' likes'}</span></strong></div>
                    {/* <strong><span style={{paddingLeft:'13px'}}>{item.title}</span></strong> */}
                    <div style={{display:'flex',paddingLeft:'13px'}} >
                        <strong><span>{item.postedBy.name}</span></strong>
                    <p style={{paddingLeft:'13px'}}>{item.body}</p>
                    </div>
                    
                    <br/>
                    <p style={{paddingLeft:'13px',color:'#00376B'}}>{item.comments.length>2?'View all '+item.comments.length+' comments':''}</p>
                    <div style={{display:'flex',height:'150px' ,flexDirection:'column'}}>
                    {
                        
                    item.comments.slice(item.comments.length-2).reverse().map((com)=>{
                        return (
                        <div style={{display:'flex',width:'100%',paddingLeft:'13px'}}>
                            <strong><span style={{marginRight:'10px'}}>{com.user.name}</span></strong>    
                            <p style={{wordWrap: 'break-word',
                        overflowWrap: 'break-word'}}>{com.text.split(' ').length>25?com.text.slice(0,com.text.length/3)+' more...':com.text}</p>
                        </div>  )
                       
                    })
                }
                </div>
                    <div style={{position:'absolute',width:'100%',bottom:'0'}}>
                    <div style={{position:'relative'}}>
                        <textarea onChange={(e)=>setComment(e.target.value)} wrap="hard" cols="10" className="comment-box" placeholder="Add a comment..."></textarea>
                    {/* <input onChange={(e)=>setComment(e.target.value)} className="input-field2" type="text" placeholder="   Add a comment..."/> */}
                    <button onClick={()=>postComment(item._id)} style={{position:'absolute',right:'15px',top:'7px',marginTop:'7px',fontWeight:'bold' ,background:'none',color:'#0095F6',border:'none',padding:'0px',cursor:'Pointer'}}>Post</button>
                    </div>
                    </div>
                    
                </div>
             
            </div>
             )
            })
            
            }
             
        </div>
        
    )
}

export default Home;