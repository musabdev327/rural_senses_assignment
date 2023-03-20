import { Fragment, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListTodo from "../Categories/ListTodo";
import InputTodo from "../Categories/InputTodo";
import ProductsList from "../Products/ProductsList";
import Navbar from "../Navbar";
import { Context_User } from "./AdminPanel";

const AdminHome = () => {
  const navigate = useNavigate();
  const { controls, controlDispatch } = useContext(Context_User);

  const deleteUsers = async (id) => {
    try {
      const response = await fetch(`/admins/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
      const jsonData = await response.json();
      if (response.status === 409) {
        alert("Login Expired... Please login again");
        navigate("/login");
        return;
      } else if (response.status === 200) {
        // const newUser = controls.users.filter((user) => user._id !== id);
        controlDispatch({ type: "Delete_Users", payload: id });
        alert("User Deleted !!!");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("/admins", {
        method: "GET",
      });
      const jsonData = await response.json();
      controlDispatch({ type: "Fetch_Users", payload: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (!controls.status) {
      if (!localStorage.getItem("Token")) {
        navigate("/404");
      } else {
        if (localStorage.getItem("loginType") === "admin") {
          controlDispatch({ type: "Set_Status", payload: true });
        } else {
          navigate("/404");
        }
      }
    }
  });
  useEffect(() => {
    if (localStorage.getItem("loginType") === "admin") {
      getUsers();
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="user-list">
        <h1 className="text-center mt-5">List of Users</h1>
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {controls.users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUsers(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InputTodo />
      <ListTodo />
      <ProductsList />
    </Fragment>
  );
};

export default AdminHome;
