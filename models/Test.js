const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const testSchema = Schema({
  name: String,
  grades: [{studentId: String, studentGrade: String}],
  deadLine: Date,
  schoolRecordId: String
});

mongoose.model("tests", testSchema)
