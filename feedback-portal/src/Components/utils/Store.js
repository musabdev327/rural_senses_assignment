import React, { useEffect, useReducer, useState } from "react";

export const Context_Store = React.createContext("");
const initialState = {
  products: [],
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Categories":
      return { ...state, categories: action.payload };
    case "Delete_Categories_Data":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case "Update_Categories_Data":
      return { ...state, categories: action.payload };
    case "Create_Categories_Data":
      return { ...state, categories: action.payload };
    case "Fetch_Products":
      return { ...state, products: action.payload };
    case "Delete_Products_Data":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "Update_Products_Data":
      return {
        ...state,
        products: action.payload,
      };
    case "Create_Products_Data":
      return { ...state, products: action.payload };
    default:
      return { ...state };
  }
};

const Store = ({ children }) => {
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context_Store.Provider value={{ store, storeDispatch: dispatch }}>
      {children}
    </Context_Store.Provider>
  );
};

export default Store;
