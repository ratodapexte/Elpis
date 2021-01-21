const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cpf: String,
  classroomIds: [String],
  schoolIds: [String],
})

mongoose.model("teachers", teacherSchema)
