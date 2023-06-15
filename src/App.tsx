import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddEmployee from "./employees/addEmployee";
import EditEmployee from "./employees/EditEmployee";
import ViewEmployee from "./employees/viewEmployee";
import SignInForm from "./pages/SignInForm";

function App() {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user-state")
  );

  const loginHandler = (value: string) => {
    setUser(value);
  };

  const logoutHandler = (value: string) => {
    setUser(value);
  };

  return (
    <div>
      <Router>
        <Navbar logout={logoutHandler} userState={user} />
        <Routes>
          <Route path="*" element={<Navigate to="/signin" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInForm login={loginHandler} />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
          <Route path="/viewEmployee/:id" element={<ViewEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
