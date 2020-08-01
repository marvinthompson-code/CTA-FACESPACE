import React, { useState } from 'react';
import Modal from 'react-modal'
import { storage } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalState } from '../modal/modalSlice'
import { createNewPost } from './postsSlice'
import '../../css/PostForm.css'

const PostForm = () => {
    const dispatch = useDispatch()

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const isOpen = useSelector(state => state.modal)
    const [ input, setInput ] = useState("")

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
      
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(createNewPost({content: input}))
        setInput("")
    }
    const closeModal = () => {
        dispatch(toggleModalState())
    }
    return(
        <>
        <form onSubmit={handleSubmit} className={"postForm"}>
            <input placeholder={"Whats on your mind?"} className={"inputForm"} value={input} onChange={(e) => setInput(e.currentTarget.value)}/>
                <button type={"button"} className={"upload"} onClick={() => dispatch(toggleModalState())}>Upload Image</button>
                <button type={"submit"} className={"submit"}>Submit</button>
            <Modal
                isOpen={false}
                onRequestClose={closeModal}
                isOpen={isOpen}
                ariaHideApp={false}
            >
                <form>
                    <input type={"file"} className={"uploadInput"} onChange={handleImageAsFile}/>
                </form>
            </Modal>
        </form>
        </>
    )
}

export default PostForm;