import React, { useReducer } from "react";

const initialState = {
  users: [],
  status: false,
  loginType: "",
};
export const Context_User = React.createContext("");

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Users":
      return { ...state, users: action.payload };
    case "Delete_Users":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case "Set_Status":
      return { ...state, status: action.payload };
    case "Get_Login_Type":
      return { ...state, loginType: action.payload };
    default:
      return { ...state };
  }
};

const User = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [status, setStatus] = useState({ LoggedIn: false });
  const [controls, dispatch] = useReducer(reducer, initialState);

  return (
    <Context_User.Provider value={{ controls, controlDispatch: dispatch }}>
      {children}
    </Context_User.Provider>
  );
};

export default User;
