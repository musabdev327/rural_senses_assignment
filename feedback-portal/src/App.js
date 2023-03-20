import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// My Components

import { Login } from "./Components/Login";
import Register from "./Components/Register";
import AdminHome from "./Components/utils/AdminHome";
import User from "./Components/utils/AdminPanel";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Store from "./Components/utils/Store";
import NotFound from "./Components/404";

function App() {
  return (
    <User>
      <Fragment>
        <Router>
          <Store>
            <div className="content">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Fragment>
                      <Navbar />
                      <Dashboard/>
                    </Fragment>
                  }
                />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/404" element={<NotFound />} />
              </Routes>
            </div>
          </Store>
        </Router>
      </Fragment>
    </User>
  );
}

export default App;