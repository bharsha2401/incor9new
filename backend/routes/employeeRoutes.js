import express from "express";
import Employee from "../models/Employee.js";
import excelJS from "exceljs";

const router = express.Router();

// Add employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Export Excel
router.get("/export/excel", async (req, res) => {
  try {
    const employees = await Employee.find();
    const workbook = new excelJS.Workbook();
    const sheet = workbook.addWorksheet("Employees");

    sheet.columns = [
      { header: "Emp ID", key: "empId", width: 15 },
      { header: "Name", key: "empName", width: 25 },
      { header: "Access Code", key: "axaCode", width: 20 },
      { header: "Devices", key: "devices", width: 30 },
      { header: "Remarks", key: "remarks", width: 30 },
    ];

    employees.forEach((emp) => {
      sheet.addRow({
        empId: emp.empId,
        empName: emp.empName,
        axaCode: emp.axaCode,
        devices: emp.devices.map((d) => `${d.device} (${d.remark})`).join(", "),
        remarks: emp.remarks,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=employees.xlsx");

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: "Error exporting Excel file" });
  }
});

export default router;
