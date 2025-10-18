import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import OnboardingForm from "./components/OnboardingForm";
import EmployeeTable from "./components/EmployeeTable";
import RelievingForm from "./components/RelievingForm";

export default function App() {
  return (
    <Router>
      <div className="container mt-3">
        <nav className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Onboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/employees" className="nav-link">Employees</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/receiving" className="nav-link">Receiving</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<OnboardingForm />} />
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/receiving" element={<RelievingForm />} />
        </Routes>
      </div>
    </Router>
  );
}
