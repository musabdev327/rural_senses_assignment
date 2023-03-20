import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context_User } from "../utils/AdminPanel";
import { Context_Store } from "../utils/Store";

export default function ProductsEdit({ product }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  console.log("PRODUCT NAME ", product.name);

  const [allCatagories, setAllCatagories] = useState([]);

  const { store, storeDispatch } = useContext(Context_Store);
  const { controls, controlDispatch } = useContext(Context_User);
  const navigate = useNavigate();

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
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
      const response = await fetch(`/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify(body),
      });
      if (response.status === 409) {
        alert("Login Expired");
        navigate("/login");
      }
      if (response.status === 200) {
        const newProducts = store.products;
        for (var i = 0; i < newProducts.length; i++) {
          if (newProducts[i]._id === product._id) {
            newProducts[i].name = name;
            newProducts[i].price = price;
            newProducts[i].description = description;
          }
        }
        storeDispatch({ type: "Update_Products_Data", payload: newProducts });
        alert("Product Updated !!!");
        localStorage.getItem("loginType") === "admin"
          ? navigate("/admin")
          : navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert("Invalid Entry");
    }
  };

  const getId = (value) => {
    for (let i = 0; i < allCatagories.length; i++) {
      console.log(allCatagories[i]._id);
      console.log(value);
      if (value == allCatagories[i]._id) {
        console.log("Matched");
        return allCatagories[i].name;
      }
    }
    return value;
  };
  return (
    <Fragment>
      {controls.status ? (
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#id${product._id}`}
        >
          Edit
        </button>
      ) : null}
      <div
        className="modal"
        id={`id${product._id}`}
        onClick={() => {
          setName(name);
          setPrice(price);
          setDescription(description);
          // setCategory(product.category);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Product</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  // setName(product.name);
                  // setPrice(product.price);
                  // setDescription(product.description);
                  // setCategory(product.category);
                }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {/* <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              /> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning "
                data-dismiss="modal"
                onClick={(e) => updateProduct(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  // setName(product.name);
                  // setPrice(product.price);
                  // setDescription(product.description);
                  // setCategory(product.category);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
