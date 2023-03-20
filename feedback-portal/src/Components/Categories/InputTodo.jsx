import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context_User } from "../utils/AdminPanel";
import { Context_Store } from "../utils/Store";
import "../mystyles.css";

export default function InputTodo() {
  const [catagory, setCatagory] = useState("");
  const { store, storeDispatch } = useContext(Context_Store);
  const { controls, controlDispatch } = useContext(Context_User);
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (
        store.categories.find(
          (category) =>
            category.name.toLowerCase() === catagory.toLowerCase() ||
            category.name.toLowerCase() === catagory.toLowerCase() + "s" ||
            category.name.toLowerCase() + "s" === catagory.toLowerCase()
        )
      ) {
        alert("category already Exists");
        return;
      }
      if (catagory.length < 2) {
        alert("Invalid Entry !! ");
        return;
      }

      const body = { name: catagory };

      const response = await fetch("/catagories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);

      if (response.status === 409) {
        alert("Login Expired");
        navigate("/login");
      } else if (response.status === 407) {
        alert("Category Already Exists");
      } else if (response.status === 200) {
        var newCategories = store.categories;
        newCategories.push(data);
        console.log(newCategories);
        storeDispatch({
          type: "Create_Categorier_Data",
          payload: newCategories,
        });
        setCatagory("");
        alert("New Category Added");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err.message);
      alert("Invalid Entry");
    }
  };
  useEffect(() => {
    if (!controls.status) {
      if (!localStorage.getItem("Token")) {
        navigate("/login");
      } else {
        controlDispatch({ type: "Set_Status", payload: true });
      }
    }
  });
  return (
    <Fragment>
      <div className="category-input">
        <h1 className="text-center mt-5">Enter New Category</h1>
        <form onSubmit={onSubmitForm} className="form mt-5">
          <input
            type="text"
            className=" input"
            placeholder="category"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          />
          <button className="btn btn-success btn_add">Add</button>
        </form>
      </div>
    </Fragment>
  );
}
