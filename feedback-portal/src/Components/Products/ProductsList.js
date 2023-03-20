import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context_User } from "../utils/AdminPanel";
import { Context_Store } from "../utils/Store";
import ProductsEdit from "./ProductsEdit";

export default function ProductsList() {
  const { controls, controlDispatch } = useContext(Context_User);
  const { store, storeDispatch } = useContext(Context_Store);
  const [catagories, setCatagories] = useState("all");
  const navigate = useNavigate();
  //delete todo function

  const deleteProducts = async (id) => {
    try {
      const response = await fetch(`/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        storeDispatch({ type: "Get_Products", payload: id });
        alert("Product Deleted !!!");
        localStorage.getItem("loginType") === "admin"
          ? navigate("/admin")
          : navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert("Invalid Entry !!");
    }
  };

  const getCatagories = async () => {
    try {
      const response = await fetch("/catagories");
      const jsonData = await response.json();
      storeDispatch({ type: "Fetch_Categories", payload: jsonData });
    } catch (err) {
      console.log(err);
    }
  };
  const getId = (value) => {
    console.log(value);
    for (let i = 0; i < store.categories.length; i++) {
      var id = parseInt(store.categories[i]._id);
      if (parseInt(value) === id) {
        console.log(value);
        console.log(store.categories[i].name);
        return store.categories[i].name;
      }
    }
  };
  const getAllProducts = async () => {
    try {
      console.log("all products fetching");
      const response = await fetch("/products");
      const jsonData = await response.json();
      storeDispatch({ type: "Fetch_Products", payload: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  };
  const getProducts = async (filter) => {
    try {
      console.log(`${filter} products fetching`);
      const response = await fetch(`/products/${filter}`);
      const jsonData = await response.json();
      console.log(jsonData);
      storeDispatch({ type: "Fetch_Products", payload: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
    getCatagories();
  }, []);
  return (
    <Fragment>
      <div className="product-list">
        <h1 className="text-center mt-5">List of Products</h1>
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              {controls.status ? <th>Edit</th> : null}
              {controls.status ? <th>Delete</th> : null}
              <th>
                <select
                  className="selection"
                  onChange={(e) => {
                    setCatagories(e.target.value);
                    e.target.value === "all"
                      ? getAllProducts()
                      : getProducts(e.target.value);
                  }}
                  value={catagories}
                >
                  <option value="all">all</option>
                  {store.categories.map((catagory) => (
                    <option value={catagory.name}>{catagory.name}</option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {store &&
              store.products &&
              store.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{getId(product.category)}</td>
                  <td>
                    {controls.status ? (
                      <ProductsEdit product={product} />
                    ) : null}
                  </td>

                  <td>
                    {controls.status ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProducts(product._id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
