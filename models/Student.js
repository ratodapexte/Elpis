const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: String,
  registrationNumber: String,
  schoolId: String,
  grades: [{testId: String, grade: String}],
  coments: [{teacherId: String, coment: String}]
});

mongoose.model("students", studentSchema)
