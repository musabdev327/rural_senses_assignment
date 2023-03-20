import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import Switch from "react-switch";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email: email, password: password };
      const typ = checked ? "admins" : "users";
      const response = await fetch(`/${typ}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 405) {
        alert("Email already exists !! ");
        return;
      } else if (response.status === 200) {
        const data = await response.json();
        alert("Signup Successful... Please login to continue !!");
        console.log(data);
      }
      // checked ? navigate("/admin") : navigate("/login");
    } catch (err) {
      console.error(err.message);
      alert("Invalid email or password entered.");
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
  function ValidatePasswordLength(text) {
    if (text.length < 8) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="register">
        <h1 className="text-center mt-5">Sign up Form</h1>
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
            onChange={(e) => {
              setPassword(e.target.value);
              ValidatePasswordLength(e.target.value);
            }}
          />
          <button
            disabled={btn ? false : true}
            onClick={onSubmitForm}
            className="btn btn_signup"
          >
            Register
          </button>
          <text
            onClick={() => (window.location = "/login")}
            className="btn btn_login"
          >
            Back to Login
          </text>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
