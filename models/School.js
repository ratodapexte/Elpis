const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const templateSchema = new Schema({ classroomName:String , [StudentName:String] });

const schoolSchema = new Schema({
  name: String,
  email: String,
  password: String,
  classroomIds: [String],
  teacherIds: [String],
  classroomTemplate: [templateSchema]
})

mongoose.model("schools", schoolIdSchema)
