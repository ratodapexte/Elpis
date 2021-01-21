const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schoolRecordSchema = Schema({
  classroomId: String,
  teacherId: String,
  schoolId: String,
  testIds: [String],
});

mongoose.model("schoolRecords", schoolRecordSchema)
