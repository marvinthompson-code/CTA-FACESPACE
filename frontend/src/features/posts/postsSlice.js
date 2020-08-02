import { createSlice } from '@reduxjs/toolkit'
import { apiURL } from '../../util/apiURL'
import { setLoading } from '../loading/loadingSlice'

import axios from 'axios'
export const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        addPost: (state, action) => { state.unshift(action.payload) },
        recieveAllPosts:  (state, action) => action.payload,
        sharePost: (state, action) => { state.unshift(action.payload) },
        deletePost: (state, action) => {
            state.filter(post => {
                return post.id !== action.payload
            })
        } 
    }
})

export const createNewPost = (post) => async (dispatch, getState) => {
    try {
        debugger
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
    } catch (error) {
        
    }
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

// export const sharePostAsync = (id) => async (dispatch) => {
//     let res = await axios({
//         method: "get",
//         url: `${apiURL}/posts/${id}`
//     })
//     
//     // let { newPost } = res.data.body 
//     // 
//     // let sharedPost = {

//     // }
// // dispatch the addPost action with `user shared user's post: post ?
//     // dispatch(setLoading(true))
//     // dispatch(setLoading(false))
// }


export const selectPosts = (state) => state.posts


export const { addPost, recieveAllPosts, deletePost } = postsSlice.actions;
export default postsSlice.reducer;