import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context_User } from "./utils/AdminPanel";

const Navbar = () => {
  const { controls, controlDispatch } = useContext(Context_User);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (controls.status) {
      localStorage.clear();
      controlDispatch({ type: "Set_Status", payload: false });
    }
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <h1>My Shop</h1>
      </Link>
      <div className="links">
        <button className="btn_logout" onClick={handleHome}>
          Home
        </button>
        <button className="btn_logout" onClick={handleLogout}>
          {controls.status ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
