import React, { useState } from "react";
import axios from "axios";

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    axaCode: "",
    devices: [{ device: "", remark: "" }],
    remarks: "",
  });

  // ✅ Backend URL (Render)
  const API_BASE = "https://incor9new.onrender.com";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDeviceChange = (index, e) => {
    const newDevices = [...formData.devices];
    newDevices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, devices: newDevices });
  };

  const addDevice = () =>
    setFormData({
      ...formData,
      devices: [...formData.devices, { device: "", remark: "" }],
    });

  const removeDevice = (index) => {
    const newDevices = formData.devices.filter((_, i) => i !== index);
    setFormData({ ...formData, devices: newDevices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/employees`, formData);
      alert("✅ Employee onboarded successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Onboarding Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Employee ID</label>
          <input
            name="empId"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="empName"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Access Code</label>
          <input
            name="axaCode"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Devices</label>
          {formData.devices.map((dev, i) => (
            <div key={i} className="row mb-2">
              <div className="col">
                <input
                  name="device"
                  className="form-control"
                  placeholder="Device name"
                  value={dev.device}
                  onChange={(e) => handleDeviceChange(i, e)}
                />
              </div>
              <div className="col">
                <input
                  name="remark"
                  className="form-control"
                  placeholder="Remark"
                  value={dev.remark}
                  onChange={(e) => handleDeviceChange(i, e)}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeDevice(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addDevice}
          >
            Add device
          </button>
        </div>

        <div className="mb-3">
          <label>Remarks</label>
          <textarea
            name="remarks"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
