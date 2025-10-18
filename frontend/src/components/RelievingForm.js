import React, { useState } from "react";
import axios from "axios";

export default function RelievingForm() {
  const [empId, setEmpId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Dynamic backend URL (works locally + on Render)
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://employee-backend.onrender.com" // <-- Replace with your actual Render backend URL
      : "http://localhost:5001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmployee(null);
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/api/employees`);
      const emp = res.data.find((e) => e.empId === empId);

      if (emp) {
        setEmployee(emp);
      } else {
        setError("❌ Employee not found!");
      }
    } catch (err) {
      console.error("Error fetching employee:", err);
      setError("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Receiving</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Employee ID</label>
          <input
            className="form-control"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display Results */}
      <div className="mt-4">
        {error && <div className="alert alert-danger">{error}</div>}

        {employee && (
          <div className="card p-3 shadow-sm mt-3">
            <h5>Employee Details</h5>
            <hr />
            <p>
              <strong>Employee ID:</strong> {employee.empId}
            </p>
            <p>
              <strong>Name:</strong> {employee.empName}
            </p>
            <p>
              <strong>Access Code:</strong> {employee.axaCode || "—"}
            </p>
            <p>
              <strong>Devices:</strong>{" "}
              {employee.devices?.length > 0
                ? employee.devices
                    .map((d) => `${d.device} (${d.remark || "No remark"})`)
                    .join(", ")
                : "—"}
            </p>
            <p>
              <strong>Remarks:</strong> {employee.remarks || "—"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
