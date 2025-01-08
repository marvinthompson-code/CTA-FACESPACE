import React, { useState } from "react";
import "../../css/Login.css";
import FadeIn from "react-fade-in";
import { updateUser } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";
import LogoBlack from "../../css/logos/LogoMakr_0FIbYG.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const guestEmail = "newguestman@guest.com";
  const guestPassword = "123456";

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(email, password);
      dispatch(updateUser(res.user));
      history.push("/feed");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login(guestEmail, guestPassword);
      dispatch(updateUser(res.user));
      history.push("/feed");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className={"loginForm"}>
        <div className={"loginLogoDiv"}>
          <img src={LogoBlack} alt={"logo"} className={"logoLogin"}></img>
        </div>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit} className={"login"}>
          <input
            className={"usernameInput"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br></br>
          <input
            placeholder={"Password"}
            className={"usernameInput"}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type={"password"}
          />
          <br></br>
          <button className={"loginButton"} type={"submit"}>
            Log In
          </button>
        </form>
        <form onSubmit={handleGuestSubmit} className={"guestLogin"}>
          <button type={"submit"} className={"guestSubmitButton"}>
            Guest Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
