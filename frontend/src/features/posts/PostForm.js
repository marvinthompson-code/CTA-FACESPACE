import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewPost } from './postsSlice'
import '../../css/PostForm.css'

const PostForm = () => {
    const dispatch = useDispatch()
    const [ input, setInput ] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createNewPost({content: input}))
        setInput("")
    }
    return(
        <form onSubmit={handleSubmit} className={"postForm"}>
            <input placeholder={"Whats on your mind?"} className={"inputForm"} value={input} onChange={(e) => setInput(e.currentTarget.value)}/>
            <button type={"submit"} className={"submit"}>Submit</button>
        </form>
    )
}

export default PostForm;