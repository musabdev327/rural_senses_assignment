import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context_User } from "./utils/AdminPanel";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="bkg-blue dashboard-option">
        <Link to="/login">Login as a community worker</Link>
      </div>
      <div className="bkg-blue dashboard-option">
        <Link to="/login">Login as a Public Offcial</Link>
      </div>
      <div className="bkg-blue dashboard-option">
        <Link to="/login">Login as an Admin</Link>
      </div>
    </div>
  );
};

export default Dashboard;
