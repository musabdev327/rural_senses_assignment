import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context_Store } from "../utils/Store";

export default function EditTodo({ catagory }) {
  const [name, setName] = useState(catagory.name);
  const { store, storeDispatch } = useContext(Context_Store);
  const navigate = useNavigate();

  const updateCatagory = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(`/catagories/${catagory._id}`, {
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
        return;
      } else if (response.status === 200) {
        alert("Category Updated !!");
        var newCategories = store.categories;
        for (let i = 0; i < newCategories.length; i++) {
          if (newCategories[i]._id === catagory._id) {
            console.log("matched");
            newCategories[i].name = name;
          }
        }
        console.log(newCategories);
        storeDispatch({
          type: "Update_Categories_Data",
          payload: newCategories,
        });
      }
      navigate("/admin");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${catagory._id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${catagory._id}`}
        // onClick={() => setName(catagory.name)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Catagory</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                // onClick={() => setName(catagory.name)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning "
                data-dismiss="modal"
                onClick={(e) => updateCatagory(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                // onClick={() => setName(catagory.name)}
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
