import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import { setLoading, selectLoading } from '../loading/loadingSlice'

import axios from 'axios'
export const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        addPost: (state, action) => { state.unshift(action.payload) },
        recieveAllPosts:  (state, action) => action.payload,
        sharePost: (state, action) => {state.unshift(action.payload)},
        deletePost: (state, action) => {
            state.filter(post => {
                return post.id !== action.payload
            })
        } 
    }
    // prepare?? for the share action
})

export const createNewPost = (post) => async (dispatch, getState) => {
    const state = getState()
    let res = await axios({
        method: "post",
        url: `${apiURL()}/posts/`,
        data: post,
        headers: {
            "AuthToken": state.token
        }
    })
    let { newPost } = res.data.body
    debugger
    dispatch(addPost(newPost))
}

export const deletePostAsync = (id) => async (dispatch) => {
        await axios({
        method: "delete",
        url: `${apiURL()}/posts/${id}`
    })
    dispatch(deletePost(id))
    dispatch(setLoading(true))
    dispatch(setLoading(false))
}

export const sharePostAsync = (post) => async (dispatch, getState) => {
    const state = getState()
    let res = await axios({
        method: "post",
        url: `${apiURL}/posts/`,
        data: post,
        headers: {
            "AuthToken": state.token
        }
    })
    let { newPost } = res.data.body 

    let sharedPost = {

    }

// dispatch the addPost action with `user shared user's post: post ?
    dispatch(setLoading(true))
    dispatch(setLoading(false))
}

export const selectPosts = (state) => state.posts


export const { addPost, recieveAllPosts, deletePost } = postsSlice.actions;
export default postsSlice.reducer;