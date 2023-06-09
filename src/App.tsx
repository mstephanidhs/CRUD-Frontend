import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddEmployee from "./employees/addEmployee";
import EditEmployee from "./employees/EditEmployee";
import ViewEmployee from "./employees/viewEmployee";
import SignInForm from "./pages/SignInForm";

// TODO: Work on the authentication (and change the routing)

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* route in order to view the login page */}
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
          <Route path="/viewEmployee/:id" element={<ViewEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
