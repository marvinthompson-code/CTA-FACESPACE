import React,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { apiURL } from '../../util/apiURL'

const Likes = ({ postId, likerId }) => {
    const [counter, setCounter] = useState(0)
    const API = apiURL()
    const dispatch = useDispatch()


    const handleClick = async (e) => {
        e.preventDefault()
        await axios.post(`${API}/likes/post/${postId}/${likerId}`)
        debugger
        await axios.get(`${API}/likes/post/${postId}`)
        debugger
    }
    

    return (
        <>
        <h4 id={"counter"}>{counter}</h4>
        </>
    )
}

export default Likes