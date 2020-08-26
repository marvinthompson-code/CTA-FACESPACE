import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import axios from "axios";
import DummyPhoto from "../../css/profileImages/dummy-profile-pic.png";

const ProfileResults = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const { id } = useParams();
  const API = apiURL();

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      try {
        let res = await axios.get(`${API}/users/${id}`);
        let {
          bio,
          email,
          username,
          profile_picture,
        } = res.data.body.singleUser;
        setUsername(username);
        setBio(bio);
        setEmail(email);
        if (!profile_picture) {
          setProfilePicture(DummyPhoto);
        } else {
          setProfilePicture(profile_picture);
        }
      } catch (error) {
        // error page
      }
    };
    fetchUserInfo(id);
  }, []);

  return <div></div>;
};

export default ProfileResults;
