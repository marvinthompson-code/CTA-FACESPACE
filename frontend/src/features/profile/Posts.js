import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Heart from '../../css/profileImages/Instagram-Heart-Free-PNG-Image.png';
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../../util/apiURL'
import '../../css/ProfilePosts.css'
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png'

const Posts = () => {
    const match = useRouteMatch()
    const userPosts = useSelector(state => state.posts.filter(post => post.owner_id === match.params.id))
    const user  = useSelector(state => state.user)
    console.log(userPosts)
    const API = apiURL()
    const [ posts, setPosts ] = useState([])
    const [ profilePicture, setProfilePicture ] = useState(null)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/posts/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async (postId) => {
        try {
            
            // const likesRes = await axios.get(`${API}/likes/post/${postId}`);
            // const res = await axios.post(`${API}/likes/post/${postId}/${id}`)
            // let arr = likesRes.data.body.likes.length
        } catch (error) {
            console.log(error)
            
        }
    }
    
    useEffect(() => {
        const fetchUserPosts = async (id) => {
            try {
                let res = await axios.get(`${API}/posts/ownerID/${id}`) 
                let { posts } = res.data.body  
                setPosts(posts)    
            } catch (error) {
                console.log("Code Broke", error)
            }
        }
        fetchUserPosts(match.params.id)
    }, [API, match.params.id])

    useEffect(() => {
    const fetchUserInfo = async(id) => {
        try {
            let res = await axios.get(`${API}/users/${id}`)
            let { profile_picture } = res.data.body.singleUser
            if (!profile_picture) {
                setProfilePicture(DummyPhoto)
            } else {
                setProfilePicture(profile_picture)      
            }
        } catch (error) {
            console.log("Nah son", error)
        }
        fetchUserInfo(match.params.id)
    }
    }, [])

    const feedPosts = userPosts.map((post, i) => {
        const deleteButton = ()  => {
            if (user.id === post.owner_id) {
                return  <h5 onClick={() => handleDelete(post.id)} className={"delete"} id={post.id}>x</h5>
            }
        }
    
        return (
            <li 
            key={i} 
            id={post.id} 
            className={"Post"}>
            <div className={"userPostInfo"}>
            <br/>
            <img className={"PostProfilePic"} src={profilePicture} alt={"Profile"} value={post.owner_id}/>
            <br/>
            <h3 className={"username"}>{post.username}</h3>
            {/* <h5 onClick={() => handleDelete(post.id)} className={"delete"} id={post.id}>x</h5> */}
            {deleteButton()}
            </div>
            <img src={post.post_image_url} alt={"facespace post"} className={"faceSpaceImg"}/>
            <h2 className={"text"}>{post.content}</h2>
            <div className={"options"}>
                <img src={Heart} 
                alt={"heart"} 
                className={"heart"} 
                value={post.id} 
                onClick={
                    () => handleLike(post.id)
                } 
                    />
                {/* <h4 className={"likes"}>{likes}</h4> */}
                <h3 className={"timeStamp"}>{post.time_stamp.slice(0, 10)}</h3>
            </div>
            </li>
        )
    })

    return(
        <div className={"feedPosts"}>
        <h1 className={"userFeedPostsTitle"}>Latest Posts</h1>
            <ul className={"feed"}>
            {feedPosts.length >= 1 ? feedPosts : <div>No Posts to show! Write something!</div>}
            </ul>
        </div>
    )
}

export default Posts