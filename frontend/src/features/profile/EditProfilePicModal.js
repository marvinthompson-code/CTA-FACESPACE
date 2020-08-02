import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios';
import { storage } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModalState } from '../modal/modalSlice'
import { apiURL } from '../../util/apiURL'
import Modal from 'react-modal'

const EditProfilePicModal = () => {

    // states
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

    // variables
    const match = useRouteMatch()
    const API = apiURL()
    const isOpen = useSelector((state) => state.Modal)
    const dispatch = useDispatch()

    // handlers
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
        await axios.patch(`${API}/users/profile_pic/${match.params.id}`)
    }

    const closeModal = () => {
        dispatch(toggleModalState())
    }

    return (
        <Modal
        isOpen={true}
        onRequestClose={closeModal}
        isOpen={isOpen}
        ariaHideApp={false}
        >
            <form onSubmit={handleSubmit}>
                <input type={"file"} className={"uploadInput"} onChange={handleImageAsFile}/>
                <button type={"button"} className={"upload"} onClick={handleFireBaseUpload}>Upload Image</button>
            </form>
        </Modal>
    )
}

export default EditProfilePicModal;