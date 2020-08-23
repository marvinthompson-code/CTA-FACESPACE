import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const Likes = ({ postId, likerId }) => {
  const [counter, setCounter] = useState(0);
  const API = apiURL();

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/likes/post/${postId}/${likerId}`);

    await axios.get(`${API}/likes/post/${postId}`);
  };

  return (
    <>
      <h4 id={"counter"}>{counter}</h4>
    </>
  );
};

export default Likes;
