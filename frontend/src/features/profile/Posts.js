import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import FadeIn from "react-fade-in";
import SharedPost from "../feed/SharedPost";
import ProfilePost from "./ProfilePost";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/ProfilePosts.css";
import DummyPhoto from "../../css/profileImages/dummy-profile-pic.png";

const Posts = () => {
  const match = useRouteMatch();
  const userPosts = useSelector((state) =>
    state.posts.filter((post) => post.owner_id === match.params.id)
  );
  const API = apiURL();
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

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
      } catch (error) {}
      fetchUserInfo(match.params.id);
    };
  }, []);

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
      return (
        <div key={post.id}>
          <FadeIn>
            <ProfilePost post={post} key={post.id} />
          </FadeIn>
        </div>
      );
    }
  });

  return (
    <div className={"userFeedPosts"}>
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
