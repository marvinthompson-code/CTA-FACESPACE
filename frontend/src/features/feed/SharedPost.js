import React, { useState, useEffect } from 'react' ;
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png';
import Heart from '../../css/profileImages/Instagram-Heart-Free-PNG-Image.png';
import Share from '../../css/profileImages/224-2244409_forward-arrow-icon-share-arrow-png.png';
import { useSelector, useDispatch  } from 'react-redux';
import { createNewPost, deletePostAsync } from '../posts/postsSlice'
import { useHistory } from 'react-router-dom'
import { selectLoading, setLoading } from '../loading/loadingSlice';
// import Likes from '../likes/Likes'

const SharedPost = ({ post }) => {
    const [ username, setUsername ] = useState("")
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
        } catch (error) {
            console.log("Error", error)
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
        fetchUserInfo(post.owner_id)
    }, [])
     // ternary to check if the post is yours or someone else's, display in a nested div if a shared post
        return (
            <div>
            <h3>{username} shared a post!</h3>
            <div className={"sharedPostDiv"}>
            <li 
            id={post.id} 
            className={"Post"}>
            <div className={"userPostInfo"}>
            <br/>
            <img className={"PostProfilePic"} src={profilePicture} alt={"Profile Picture"} value={post.owner_id}/>
            <br/>
            <h3 onClick={() => displayPage(post.owner_id)} className={"username"}>{username}</h3>
            <h5 onClick={() => dispatch(deletePostAsync(post.id))} className={"delete"}>x</h5>
            </div>
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
            </div>
            </li>
                </div>                                                                 
                </div>
        )
}

export default SharedPost;