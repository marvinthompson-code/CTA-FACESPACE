import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { recieveAllPosts, selectPosts } from '../posts/postsSlice'
import { apiURL } from '../../util/apiURL'
import axios from 'axios';
import '../../css/Feed.css'
import Post from './Post'
import SharedPost from './SharedPost'



const PostsIndex = () => {
    const dispatch = useDispatch()
    const API = apiURL()
    const posts = useSelector(selectPosts)

    let feedPosts = posts.map((post) => {
        if (post.original_author !== post.owner_id) {
            return <SharedPost post={post} key={post.id}/>
        } else {
            return <Post post={post} key={post.id}/>
        }
    })

    useEffect(() => {
            const fetchPosts = async () => {   
                let res = await axios.get(`${API}/posts/`)
                dispatch(recieveAllPosts(res.data.body.posts))  
            }
        fetchPosts()
    }, [])
   
    return (
        <div className={"feedPosts"}>
            <h1 className={"feedTitle"}>Latest Posts</h1>
            <ul className={"feed"}>
                {feedPosts}
            </ul>
        </div>
    )
}

export default PostsIndex; 