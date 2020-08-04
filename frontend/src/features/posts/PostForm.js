import React, { useState } from 'react';
import { storage } from '../../firebase'
import { useDispatch } from 'react-redux';
import { createNewPost } from './postsSlice'
import '../../css/PostForm.css'

const PostForm = () => {
    const dispatch = useDispatch()

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
    const [ input, setInput ] = useState("")

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
        if (types.every((type) => image.type !== type)) {
          alert(`${image.type} is not a supported format`);
        } else {
          setImageAsFile((imageFile) => image);
        }
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        if (imageAsFile === "") {
            alert(`Please choose a valid file before uploading`);
        } else if (imageAsFile !== null) {
            const uploadTask = storage
              .ref(`/images/${imageAsFile.name}`)
              .put(imageAsFile);
            uploadTask.on(
              "state_changed",
              (snapShot) => {
                var progress =
                  (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                console.log(snapShot);
              },
              (err) => {
                console.log(err);
              },
              () => {
                storage
                  .ref("images")
                  .child(imageAsFile.name)
                  .getDownloadURL()
                  .then((fireBaseUrl) => {
                    setImageAsUrl(fireBaseUrl);
                  });
              }
            );
            setToggleUploadMsg(true);
          } else {
            setToggleUploadMsg(false);
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // for some reason its changing the post from a normal one to a shared one? I need to see what happens during this action.
        dispatch(createNewPost({content: input, post_image_url: imageAsUrl}))
        setInput("")
    }

    return(
        <>
        <form onSubmit={handleSubmit} className={"postForm"}>
            <input placeholder={"Whats on your mind?"} className={"inputForm"} value={input} onChange={(e) => setInput(e.currentTarget.value)}/>
                <input type={"file"} className={"uploadInput"} onChange={handleImageAsFile}/>
                <button type={"button"} className={"upload"} onClick={handleFireBaseUpload}>Upload Image</button>
                    {toggleUploadMsg ? <h5 id="uploadSuccess">Upload successful!</h5> : null}
                <button type={"submit"} className={"submit"}>Submit</button>
        </form>
        </>
    ) 
}

export default PostForm;