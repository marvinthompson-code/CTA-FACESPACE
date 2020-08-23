import React, { useState } from "react";
import { storage } from "../../firebase";
import { useDispatch } from "react-redux";
import { createNewPost } from "./postsSlice";
import "../../css/PostForm.css";

const PostForm = () => {
  const dispatch = useDispatch();
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);
  const [input, setInput] = useState("");

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNewPost({ content: input, post_image_url: imageAsUrl }));
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={"postForm"}>
        <div className={"postInputContainer"}>
          <input
            placeholder={"Whats on your mind?"}
            className={"inputForm"}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <div>
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
            <button type={"submit"} className={"submit"}>
              Submit
            </button>
          </div>
          {toggleUploadMsg ? (
            <h5 id="uploadSuccess">Upload successful!</h5>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default PostForm;
