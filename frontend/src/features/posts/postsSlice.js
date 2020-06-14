import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL'
import axios from 'axios'
export const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        addPost: (state, action) => { state.unshift(action.payload) },
        recieveAllPosts:  (state, action) => action.payload    
    }
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
    dispatch(addPost(newPost))
}

export const selectPosts = (state) => state.posts


export const { addPost, recieveAllPosts } = postsSlice.actions;
export default postsSlice.reducer;