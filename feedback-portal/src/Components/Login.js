import { useState, useContext } from "react";
import React, { Fragment } from "react";
import Switch from "react-switch";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Context_User } from "./utils/AdminPanel";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [btn, setBtn] = useState(false);
  const { controls, controlDispatch } = useContext(Context_User);
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email: email, password: password };
      const typ = checked ? "admins" : "users";
      const response = await fetch(`/${typ}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.status === 401 || response.status === 405) {
        alert("Invalid username or password");
        return;
      } else if (response.status === 200) {
        const user = {
          LoggedIn: true,
        };
        controlDispatch({ type: "Set_Status", payload: true });
        localStorage.setItem("Token", data.userData.token);
        alert("Login successful !!");
        if (checked) {
          localStorage.setItem("loginType", "admin");
          navigate("/admin");
        } else {
          localStorage.setItem("loginType", "user");
        }
      }
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    }
  };
  function ValidateEmail(text) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(btn);
    if (text.match(mailformat)) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="login">
        <h1 className="text-center mt-5">Sign in</h1>
        <form className="form mt-5">
          Admin Login{" "}
          <Switch onChange={(e) => setChecked(e)} checked={checked}></Switch>
          <input
            type="text"
            className=" input"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              ValidateEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className=" input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={btn ? false : true}
            onClick={onSubmitForm}
            className="btn btn_add"
          >
            Submit
          </button>
          <Link to={"/Register"}>
            <button className="btn btn_signup">Register</button>
          </Link>
          <text
            style={{
              display: "flex",
              justifyConstent: "center",
              alignItems: "center",
              marginTop: "20px",
              color: "red",
            }}
          ></text>
        </form>
      </div>
    </Fragment>
  );
};
