import React, { useState } from "react";
import FadeIn from "react-fade-in";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalState } from "../modal/modalSlice";
import Modal from "react-modal";
import { apiURL } from "../../util/apiURL";
import "../../css/EditProfilePicForm.css";

const EditProfilePicModal = () => {
  // states
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  // variables
  const match = useRouteMatch();
  const API = apiURL();
  let isOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  // handlers
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
  };

  const handleFireBaseUpload = () => {
    if (imageAsFile === "") {
      alert(`Please choose a valid file before uploading`);
    } else if (imageAsFile !== null) {
      const uploadTask = db
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
          db
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios({
        method: "patch",
        url: `${API}/users/profile_Pic/${match.params.id}`,
        body: {
          profile_picture: imageAsUrl,
        },
      });
      
    } catch (error) {}
    // need to fix this
   
  };

  const closeModal = () => {
    dispatch(toggleModalState());
  };

  return (
    <Modal
      isOpen={false}
      onRequestClose={closeModal}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          backgroundColor: "#72a276",
          borderRadius: "10px",
          borderStyle: "solid",
          borderColor: "#72a276",
          left: "25%",
          right: "25%",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
      }}
    >
      <FadeIn>
        <form onSubmit={handleSubmit} className={"editProfilePicForm"}>
          <h1 className={"editProfilePicTitle"}>Edit Profile Picture</h1>
          <input
            type={"file"}
            className={"uploadInput"}
            onChange={handleImageAsFile}
          />
          <button
            type={"button"}
            className={"upload"}
            onClick={handleFireBaseUpload}
          >
            Upload Image
          </button>
          {toggleUploadMsg ? (
            <h5 className={"uploadMessage"}>Upload successful!</h5>
          ) : null}
          <button type={"submit"} className={"submit"}>
            Submit
          </button>
        </form>
      </FadeIn>
    </Modal>
  );
};

export default EditProfilePicModal;
