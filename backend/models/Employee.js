import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  empId: String,
  empName: String,
  axaCode: String,
  devices: [{ device: String, remark: String }],
  remarks: String,
});

export default mongoose.model("Employee", employeeSchema);
