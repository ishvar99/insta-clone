import React,{useContext, useEffect, useState} from 'react';
import {UserContext} from '../../App'
const Profile =()=>{
    const {state,dispatch}=useContext(UserContext);
    console.log(state);
    const user=JSON.parse(localStorage.getItem('user'))
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('/post',{
            headers:{
                'auth':localStorage.getItem('token')
            }
        }).then((res)=>res.json())
        .then((result)=>{
            setPosts(result.posts)
        })
    },[])
    return (
        <div>
        <div className="container">
            <div className="profile">
                <div className="pic">
                    <img style={{borderRadius:'50%',width:'160px',height:'160px'}}
                    src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555924665/shape/mentalfloss/459405241.jpg"/>
                </div>
                <div className='details'>
                    <div className='header'>
                        <h5 style={{marginRight:'25px'}}>username</h5>
                        <a style={{marginTop:"12px"}} className="waves-effect waves-light btn-small #42a5f5 blue lighten-1 #ffffff white-text">Follow</a>
                    </div>
                    <div className="posts">
                        <span>100 posts</span>
                        <span>6000 followers</span>
                        <span>3000 following</span>
                    </div>
                    <div className="name">
                        <h6>{user.name}</h6>
                    </div>
                    <div className="desc">
                        <p>Velit culpa ad consectetur qui magna duis enim cillum. Proident sint exercitation labore commodo officia sint sit laboris laborum minim ut proident officia. Exercitation sint ea ut eu amet velit irure dolore labore non sint culpa labore sunt. Occaecat et ipsum mollit est occaecat.</p>
                    </div>
                </div>
            </div>
            </div>
            <div style={{textAlign:'center'}}>
        <h4>Posts</h4>
            </div>
            <div className="gallery">
                {
                    posts.map((item)=>{
                        return (<img className="item" src={item.photo}/>);
                    })
                }
        
        </div>
        </div>
    )
}

export default Profile;