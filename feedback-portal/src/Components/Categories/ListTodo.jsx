import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context_Store } from "../utils/Store";
import EditTodo from "./EditTodo";

export default function ListTodo() {
  const { store, storeDispatch } = useContext(Context_Store);
  const navigate = useNavigate();

  //delete todo function

  const deleteCatagory = async (id) => {
    try {
      const response = await fetch(`/catagories/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
      });
      const data = await response.json();
      // const newCategories = store.categories.filter((c) => c._id !== id);
      if (response.status === 200) {
        if (store.products.some((product) => product.category === id)) {
          const newProducts = store.products.filter(
            (product) => product.category !== id
          );
          storeDispatch({
            type: "Fetch_Products",
            payload: newProducts,
          });
        }
        storeDispatch({
          type: "Delete_Categories_Data",
          payload: id,
        });
        console.log(store.categories);
        alert("Category Deleted !!");
        // storeDispatch(false);
        navigate("/admin");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="category-list" id="category_list">
        <h1 className="text-center mt-5">List of Categories</h1>
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Categories</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {store.categories.map((catagory) => (
              <tr key={catagory._id}>
                <td>{catagory.name}</td>
                <td>
                  <EditTodo catagory={catagory} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCatagory(catagory._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
