import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context_User } from "../utils/AdminPanel";
import { Context_Store } from "../utils/Store";
import "../mystyles.css";

export default function ProductsInput() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("select");

  const { store, storeDispatch } = useContext(Context_Store);
  const { controls, controlDispatch } = useContext(Context_User);
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!controls.status) {
      if (!localStorage.getItem("Token")) {
        alert("Please login first !!");
        navigate("/login");
        return;
      }
    }
    try {
      console.log("category is ", category);
      if (
        name.length < 2 ||
        price.length < 1 ||
        description.length < 5 ||
        category === "select" ||
        category === ""
      ) {
        alert("Invalid Entry");
        return;
      }
      const body = { name, price, description, category };
      console.log(body);
      const response = await fetch("/products", {
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
        alert("Item already exists !!");
      } else if (response.status === 200) {
        alert("New product added !!!");
        var newProduct = store.products;
        newProduct.push(data);
        console.log(newProduct);
        storeDispatch({ type: "Create_Products_Data", payload: newProduct });
        setName("");
        setPrice("");
        setDescription("");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert("Invalid Entry !!");
    }
  };
  if (!controls.status) {
    if (localStorage.getItem("Token") === null) {
      return <div></div>;
    } else {
      controlDispatch({ type: "Set_Status", payload: true });
    }
  }

  return (
    <Fragment>
      <div className="product-input">
        <h1 className="text-center mt-5">Enter New Product</h1>
        <form onSubmit={onSubmitForm} className="form mt-5">
          <input
            type="text"
            className="input inp_name"
            required
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="input inp_price"
            placeholder="price"
            value={price}
            onChange={(e) => {
              // e.target.value.match(/^[0-9]+$/)
              setPrice(e.target.value);
              // : setPrice("");
            }}
          />
          <textarea
            type="text"
            className="textarea inp_desc"
            placeholder="description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <input
            type="text"
            className="input inp_cat"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
          <select
            className="selection category-selection"
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(e.target.value);
            }}
            value={category}
          >
            <option value="select">select</option>
            {store.categories.map((catagory) => (
              <option value={catagory._id}>{catagory.name}</option>
            ))}
          </select>
          <button className="btn btn-success btn_add">Add</button>
        </form>
      </div>
    </Fragment>
  );
}
