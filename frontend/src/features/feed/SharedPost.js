import React, { useState, useEffect } from 'react' ;
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png';
import Heart from '../../css/profileImages/Instagram-Heart-Free-PNG-Image.png';
import { useDispatch  } from 'react-redux';
import { deletePostAsync } from '../posts/postsSlice'
import { useHistory } from 'react-router-dom'
import '../../css/SharePost.css'
// import Likes from '../likes/Likes'

const SharedPost = ({ post }) => {
    const [ username, setUsername ] = useState("")
    const [ original, setOriginal ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)
    const API = apiURL()
    const dispatch = useDispatch()
    const history = useHistory()

    const displayPage = (id) => history.push(`/profile/${id}`)

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
            setOriginal(post.original_author)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const fetchShareInfo = async(id) => {
        try {
            let res = await axios.get(`${API}/users/${id}`)
            let { username } = res.data.body.singleUser
            setOriginal(username)
        } catch (error) {
            console.log("Error", error)
        }
    }


    const handleLike = async (postId) => {
        try {
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        fetchUserInfo(post.owner_id)
        fetchShareInfo(post.original_author)
    }, [])
        return (
            <>
            <div className={"shareContainer"}>
            <h1 id={"shareTitle"}>{username} shared a post!</h1>
            <div className={"sharedPostDiv"}>
            <li 
            id={post.id} 
            className={"Post"}>
            <div className={"userPostInfo"}>
            <br/>
            <img className={"PostProfilePic"} src={profilePicture} alt={"Profile Picture"} value={post.owner_id}/>
            <br/>
            <h3 onClick={() => displayPage(post.owner_id)} className={"username"}>{original}</h3>
            <h5 onClick={() => dispatch(deletePostAsync(post.id))} className={"delete"}>x</h5>
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
                <h3 className={"timeStamp"}>{post.time_stamp.slice(0, 10)}</h3>
            </div>
            </li>
                </div>                                                                 
                </div>
                </>
        )
    }

export default SharedPost;