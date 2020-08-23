import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import FadeIn from "react-fade-in";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../modal/modalSlice";
import DummyPhoto from "../../css/profileImages/dummy-profile-pic.png";
import "../../css/Profile.css";

const Profile = () => {
  const match = useRouteMatch("/profile/:id");
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const user = useSelector((state) => state.user);
  const API = apiURL();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      let res = await axios.get(`${API}/users/${id}`);
      let { bio, email, username, profile_picture } = res.data.body.singleUser;
      setUsername(username);
      setBio(bio);
      setEmail(email);
      if (!profile_picture) {
        setProfilePicture(DummyPhoto);
      } else {
        setProfilePicture(profile_picture);
      }
    };
    fetchUserInfo(match.params.id);
  }, [currentUser, API, match.params.id]);

  const handleModal = () => {
    if (match.params.id === user.id) {
      dispatch(toggleModalState());
    }
  };

  return (
    <div>
      <FadeIn transitionDuration={500}>
        <div className={"ProfileInfo"}>
          <div className={"BasicInfo"}>
            <img
              src={profilePicture}
              alt={"Profile"}
              className={"ProfileImg"}
              onClick={handleModal}
            />
            <h2 className={"username"}>{username}</h2>
            <h3 className={"bio"}>{bio}</h3>
            <label className="contactLabel">Contact:</label>
            <h3 className={"emailProfile"}>{email}</h3>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Profile;
