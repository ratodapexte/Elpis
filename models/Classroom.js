const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  name: String,
  startTime: String,
  endTime: String,
  shift: String,
  teacherId: String,
  schoolId: String,
  studentIds: [String],
  coments: [{teacherId: String, coment: String}]
})

mongoose.model("classrooms", classroomSchema)
