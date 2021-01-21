const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Student")
const Student = mongoose.model("students")

router.get('/', async (req, res) => {
  let allStudents = await Student.find({})
  return res.json(allStudents);
})

router.get('/coments/:id', async (req, res) =>{
  let student = await Student.findById(req.params.id);
  return res.json(student.coments);
})

router.get('/grades/:id', async (req, res) =>{
  let student = await Student.findById(req.params.id);
  return res.json(student.grades);
})

router.get('/:id', async (req, res) => {
  let student = await Student.findById(req.params.id);
  return res.json(student);
})

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  return res.json({message:"Remove"});
})

router.put("/:id", async (req, res) =>{
  let student = await Student.findById(req.params.id);
  student.name = req.body.name || student.name
  student.registrationNumber = req.body.registrationNumber || student.registrationNumber
  student.schoolId = req.body.schoolId || student.schoolId
  student.grades = req.body.grades || student.grades
  student.coments = req.body.coments || student.coments
  student.save()
  return res.json(student)
})

router.post('/', (req, res) => {
  try {
    let newStudent = {
      name: req.body.name,
      registrationNumber: req.body.registrationNumber,
      schoolId: req.body.schoolId,
      grades:[],
      coments:[]
    }
    new Student(newStudent).save()
    res.json(newStudent)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

router.post('/addGrade/:id', async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    let newGrade = {
      testId: req.body.testId,
      grade: req.body.grade
    }
    student.grades.push(newGrade)
    student.save()
    res.json(student)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

router.post('/addComent/:id', async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    let newComent = {
      teacherId: req.body.teacherId,
      coment: req.body.coment
    }
    student.coments.push(newComent)
    student.save()
    res.json(student)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

module.exports = router
