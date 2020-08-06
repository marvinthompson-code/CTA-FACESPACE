import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recieveAllPosts, selectPosts } from '../posts/postsSlice';
import FadeIn from 'react-fade-in';
import { apiURL } from '../../util/apiURL';
import axios from 'axios';
import Post from './Post';
import SharedPost from './SharedPost';
import '../../css/Feed.css'

const PostsIndex = () => {
    const dispatch = useDispatch()
    const API = apiURL()
    const posts = useSelector(selectPosts)

    let feedPosts = posts.map((post) => {

        if (post.original_author !== post.owner_id) {
            return(
                <div key={post.id}>
                <FadeIn>
                    <SharedPost post={post} key={post.id}/>
                </FadeIn>
             </div>
            )
        } else {
            return (
            <div key={post.id}>
            <FadeIn>
             <Post post={post} key={post.id}/>
            </FadeIn>
             </div>
            )
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