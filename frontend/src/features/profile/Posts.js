import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios';
import { apiURL } from '../../util/apiURL'
import '../../css/ProfilePosts.css'
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png'

const Posts = () => {
    const match = useRouteMatch()
    debugger
    // console.log(id)
    const user = useSelector(state => state.user)
    const userPosts = useSelector(state => state.posts.filter(post => post.owner_id === user.id))
    console.log(userPosts)
    const API = apiURL()
    const [ posts, setPosts ] = useState([])
    const [ username, setUsername ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/posts/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserInfo = async(id) => {
        try {
            let res = await axios.get(`${API}/users/${id}`)
            let { username, profile_picture } = res.data.body.singleUser
            setUsername(username)
            if (!profile_picture) {
                setProfilePicture(DummyPhoto)
            } else {
                setProfilePicture(profile_picture)      
            }
        } catch (error) {
            console.log("Nah son", error)
        }
    }

    const feedPosts = userPosts.map((post, i) => {
        
        fetchUserInfo(post.owner_id)
        return (
            <li 
            key={i} 
            id={post.id} 
            className={"Post"}>
            <div className={"userPostInfo"}>
            <br/>
            <img className={"PostProfilePic"} src={profilePicture} alt={"Profile"} value={post.owner_id}/>
            <br/>
            <h3>{username}</h3>
            <h5 onClick={() => handleDelete(post.id)} className={"delete"} id={post.id}>x</h5>
            </div>
            <h2 className={"text"}>{post.content}</h2>
            </li>
        )
    })
    useEffect(() => {
        const fetchUserPosts = async (id) => {
            try {
                let res = await axios.get(`${API}/posts/ownerID/${id}`) 
                debugger
                let { posts } = res.data.body  
                setPosts(posts)    
            } catch (error) {
                console.log("Code Broke", error)
            }
        }
        fetchUserPosts(user.id)
    }, [])
    return(
        <div className={"feedPosts"}>
        <h1>Latest Posts</h1>
            <ul className={"feed"}>
            {feedPosts.length >= 1 ? feedPosts : <div>No Posts to show! Write something!</div>}
            </ul>
        </div>
    )
}

export default Posts