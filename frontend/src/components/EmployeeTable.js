import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Render backend URL
  const API_BASE = "https://incor9new.onrender.com";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/employees`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportExcel = () => window.open(`${API_BASE}/api/employees/export/excel`, "_blank");

  return (
    <div>
      <h2 className="mb-4">Employees</h2>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search by ID or name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={exportExcel}>Export Excel</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Access Code</th>
            <th>Devices</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (emp) =>
                emp.empId.includes(search) ||
                emp.empName.toLowerCase().includes(search.toLowerCase())
            )
            .map((emp) => (
              <tr key={emp._id}>
                <td>{emp.empId}</td>
                <td>{emp.empName}</td>
                <td>{emp.axaCode}</td>
                <td>
                  {emp.devices.length > 0
                    ? emp.devices.map((d) => `${d.device} (${d.remark})`).join(", ")
                    : "—"}
                </td>
                <td>{emp.remarks || "—"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
