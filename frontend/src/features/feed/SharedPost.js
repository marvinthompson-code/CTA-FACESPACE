import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import DummyPhoto from "../../css/profileImages/dummy-profile-pic.png";
import { useDispatch } from "react-redux";
import { deletePostAsync } from "../posts/postsSlice";
import trashcan from "../../css/profileImages/trash.png";
import { useHistory } from "react-router-dom";
import "../../css/SharePost.css";
const SharedPost = ({ post }) => {
  const [original, setOriginal] = useState("");
  const [user, setUser] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const API = apiURL();
  const dispatch = useDispatch();
  const history = useHistory();

  const displayPage = (id) => history.push(`/profile/${id}`);

  const fetchUserInfo = async (id) => {
    try {
      let res = await axios.get(`${API}/users/${id}`);
      let { profile_picture, username } = res.data.body.singleUser;
      if (!profile_picture) {
        setProfilePicture(DummyPhoto);
        setUser(username);
      } else {
        setProfilePicture(profile_picture);
      }
      setOriginal(post.original_author);
    } catch (error) {
      // error page
    }
  };

  const fetchShareInfo = async (id) => {
    try {
      let res = await axios.get(`${API}/users/${id}`);
      let { username } = res.data.body.singleUser;

      setOriginal(username);
    } catch (error) {
      // error page
    }
  };

  useEffect(() => {
    fetchUserInfo(post.owner_id);
    fetchShareInfo(post.original_author);
  }, []);
  return (
    <div className={"shareContainer"}>
      <h1 id={"shareTitle"}>{user} shared a post!</h1>

      <li id={post.id} className={"Post"}>
        <div className={"userPostInfo"}>
          <br />
          <img
            className={"PostProfilePic"}
            src={profilePicture}
            alt={"Profile Picture"}
            value={post.owner_id}
          />
          <br />
          <h3 onClick={() => displayPage(post.owner_id)} className={"username"}>
            {original}
          </h3>
          <button
            type="button"
            onClick={() => dispatch(deletePostAsync(post.id))}
            className={"delete"}
          >
            <img src={trashcan} className={"deleteTrash"} />
          </button>
        </div>
        {post.post_image_url === "" ? null : (
          <div className="postImageDiv">
            <img
              src={post.post_image_url}
              alt={"facespace post"}
              className={"faceSpaceImg"}
            />
          </div>
        )}
        <h2 className={"text"}>{post.content}</h2>
        <div className={"options"}>
          <h3 className={"timeStamp"}>{post.time_stamp.slice(0, 10)}</h3>
        </div>
      </li>
    </div>
  );
};

export default SharedPost;
