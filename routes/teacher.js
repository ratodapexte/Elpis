const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Teacher")
const Teacher = mongoose.model("teachers")

router.get('/', async (req, res) => {
  let todosProfessores = await Teacher.find({})
  return res.json(todosProfessores);
})

router.get('/:id', async (req, res) => {
  let teacher = await Teacher.findById(req.params.id);
  return res.json(teacher);
})

router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndRemove(req.params.id);
  return res.json({message:"Remove"});
})

router.put("/:id", async (req, res) =>{
  let teacher = await Teacher.findById(req.params.id);
  teacher.name = req.body.name || teacher.name
  teacher.email = req.body.email || teacher.email
  teacher.password = req.body.password || teacher.password
  teacher.cpf = req.body.cpf || teacher.cpf
  teacher.classroomIds = req.body.classroomIds || teacher.classroomIds
  teacher.schoolIds = req.body.schoolIds || teacher.schoolIds
  teacher.save()
  return res.json(teacher)
})

router.post('/', (req, res) => {
  try {
    let newTeacher = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cpf: req.body.cpf,
      classroomIds:[],
      schoolIds:[]
    }
    new Teacher(newTeacher).save()
    res.send(newTeacher)
  }catch{
    res.send({error:{code:2, message:"Error"}})
  }
});

module.exports = router
