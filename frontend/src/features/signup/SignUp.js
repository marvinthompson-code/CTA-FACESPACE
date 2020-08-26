import React, { useState } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { updateUser } from "../user/userSlice";
import { storage } from "../../firebase";
import { useDispatch } from "react-redux";
import { apiURL } from "../../util/apiURL";
import { signUp } from "../../util/firebaseFunctions";
import "../../css/SignUp.css";

const SignUp = () => {
  // states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [bio, setBio] = useState("");

  // image upload
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [toggleUploadMsg, setToggleUploadMsg] = useState(false);

  // handle image for upload
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    const types = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    if (types.every((type) => image.type !== type)) {
      alert(`${image.type} is not a supported format`);
    } else {
      setImageAsFile((imageFile) => image);
    }
  };

  // handle firebase upload

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

  // variables
  const API = apiURL();
  const history = useHistory();
  const dispatch = useDispatch();

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      console.log("Show user", res);
      await axios.post(`${API}/users/addUser`, {
        id: res.user.uid,
        email,
        username,
        fullName,
        profile_picture: imageAsUrl,
        bio,
      });
      debugger;
      dispatch(updateUser(res.user));
      history.push("/feed");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2 className={"signUpTitle"}>Sign Up!</h2>
      <FadeIn>
        <ul className={"signupInfo"}>
          <li className={"info"}>Connect with friends and Loved ones!</li>
          <li className={"info"}>Make a custom Profile!</li>
        </ul>
      </FadeIn>
      <form onSubmit={handleSubmit} className={"SignUp"}>
        {error ? <div>{error}</div> : null}
        <input
          placeholder={"Full Name"}
          value={fullName}
          onChange={(e) => setFullName(e.currentTarget.value)}
          required
        ></input>
        <br></br>
        <input
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        ></input>
        <br></br>
        <input
          placeholder={"username"}
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        ></input>
        <br></br>
        <input
          placeholder={"password"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        ></input>
        <br></br>
        <textarea
          placeholder={"Add a short bio!"}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
          className="bioTextArea"
        ></textarea>
        <br></br>
        <label className="contactLabel">Upload Profile Picture</label>
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
          <h5 id="uploadSuccess">Upload successful!</h5>
        ) : null}
        <br></br>
        <button className={"submitButton"} type={"submit"}>
          Sign me up!
        </button>
      </form>
    </div>
  );
};

export default SignUp;
