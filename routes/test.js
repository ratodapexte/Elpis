const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Test")
const Test = mongoose.model("tests")

router.get('/', async (req, res) => {
  let allTest = await Test.find({})
  return res.json(allTest);
})

router.get('/:id', async (req, res) => {
  let test = await Test.findById(req.params.id);
  return res.json(test);
})

router.get('/grades/:id', async (req, res) =>{
  let test = await Test.findById(req.params.id);
  return res.json(test.grades);
})

router.delete('/:id', async (req, res) => {
  await Test.findByIdAndRemove(req.params.id);
  return res.json({message:"Remove"});
})

router.put("/:id", async (req, res) =>{
  let test = await Test.findById(req.params.id);
  test.name = req.body.name || test.name
  test.grades = req.body.grades || test.grades
  test.deadLine = req.body.deadLine || test.deadLine
  test.schoolRecordId = req.body.schoolRecordId || test.schoolRecordId
  test.save()
  return res.json(test)
})

router.post('/', (req, res) => {
  try {
    let newTest = {
      name: req.body.name,
      grades: [],
      schoolRecordId: req.body.schoolRecordId
    }
    new Test(newTest).save()
    res.send(newTest)
  }catch{
    res.send({error:{code:2, message:"Error"}})
  }
});

router.post("/addGrade/:id", async(req, res) =>{
  let test = await Test.findById(req.params.id);
  let student = {
    studentId: req.body.studentId,
    studentGrade: req.body.studentGrade
  }
  test.grades.push(student)
  await test.save()
  res.json(student)
})
//falta remover, da updat na nota, get uma nota e get todas as grades
module.exports = router
