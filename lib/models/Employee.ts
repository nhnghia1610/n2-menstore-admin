import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  clerkId: String,
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  joinDate: Date,
  salary: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;