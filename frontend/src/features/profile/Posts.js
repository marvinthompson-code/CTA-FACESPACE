import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import FadeIn from "react-fade-in";
import SharedPost from "../feed/SharedPost";
import axios from "axios";
import Share from "../../css/profileImages/224-2244409_forward-arrow-icon-share-arrow-png.png";
import { apiURL } from "../../util/apiURL";
import { createNewPost, deletePostAsync } from "../posts/postsSlice";
import "../../css/ProfilePosts.css";
import DummyPhoto from "../../css/profileImages/dummy-profile-pic.png";

const Posts = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const userPosts = useSelector((state) =>
    state.posts.filter((post) => post.owner_id === match.params.id)
  );
  const user = useSelector((state) => state.user);
  const API = apiURL();
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/posts/${id}`);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUserPosts = async (id) => {
      try {
        let res = await axios.get(`${API}/posts/ownerID/${id}`);
        let { posts } = res.data.body;
        setPosts(posts);
      } catch (error) {}
    };
    fetchUserPosts(match.params.id);
  }, [API, match.params.id]);

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      try {
        let res = await axios.get(`${API}/users/${id}`);
        let { profile_picture } = res.data.body.singleUser;
        if (!profile_picture) {
          setProfilePicture(DummyPhoto);
        } else {
          setProfilePicture(profile_picture);
        }
        debugger;
      } catch (error) {}
      fetchUserInfo(match.params.id);
    };
  }, []);

  const handleShare = (post) => {
    try {
      const newPost = {
        ...post,
      };
      newPost.owner_id = user.id;
      dispatch(createNewPost(newPost));
    } catch (error) {
      // error page
    }
  };

  const feedPosts = userPosts.map((post, i) => {
    if (post.original_author !== post.owner_id) {
      return (
        <div key={post.id}>
          <FadeIn>
            <SharedPost post={post} key={post.id} />
          </FadeIn>
        </div>
      );
    } else {
      const deleteButton = () => {
        if (user.id === post.owner_id) {
          return (
            <h5
              onClick={() => handleDelete(post.id)}
              className={"delete"}
              id={post.id}
            >
              x
            </h5>
          );
        }
      };

      return (
        <li key={i} id={post.id} className={"Post"}>
          <div className={"userPostInfo"}>
            <br />
            <img
              className={"PostProfilePic"}
              src={profilePicture}
              alt={"Profile"}
              value={post.owner_id}
            />
            <br />
            <h3 className={"username"}>{post.username}</h3>

            {deleteButton()}
          </div>
          {post.post_image_url === "" ? null : (
            <img
              src={post.post_image_url}
              alt={"facespace post"}
              className={"faceSpaceImg"}
            />
          )}
          <h2 className={"text"}>{post.content}</h2>
          <div className={"options"}>
            {user.id !== post.owner_id ? (
              <img
                src={Share}
                alt={"share"}
                className={"share"}
                onClick={handleShare}
              />
            ) : null}
            <h3 className={"timeStamp"}>{post.time_stamp.slice(0, 10)}</h3>
          </div>
        </li>
      );
    }
  });

  return (
    <div className={"feedPosts"}>
      <h1 className={"userFeedPostsTitle"}>Latest Posts</h1>
      <ul className={"feed"}>
        {feedPosts.length >= 1 ? (
          feedPosts
        ) : (
          <div>
            <h3 className={"noFeed"}>No Posts to show! Write something!</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Posts;
