const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Classroom")
const Classroom = mongoose.model("classrooms")

router.get('/', async (req, res) => {
  let allClassroom = await Classroom.find({})
  return res.json(allClassroom);
})

router.get('/coment/:id', async (req, res) =>{
  let classroom = await Classroom.findById(req.params.id);
  return res.json(classroom.coments);
})

router.get('/student/:id', async (req, res) =>{
  let classroom = await Classroom.findById(req.params.id);
  return res.json(classroom.studentIds);
})

router.get('/:id', async (req, res) => {
  let classroom = await Classroom.findById(req.params.id);
  return res.json(classroom);
})

router.delete('/:id', async (req, res) => {
  await Classroom.findByIdAndRemove(req.params.id);
  return res.json({message:"Remove"});
})

router.put("/:id", async (req, res) =>{
  let classroom = await Classroom.findById(req.params.id);
  classroom.name = req.body.name || classroom.name
  classroom.startTime = req.body.startTime || classroom.startTime
  classroom.endTime = req.body.endTime || classroom.endTime
  classroom.shift = req.body.shift || classroom.shift
  classroom.teacherId = req.body.teacherId || classroom.teacherId
  classroom.schoolId = req.body.schoolId || classroom.schoolId
  classroom.studentIds = req.body.studentIds || classroom.studentIds
  classroom.coments = req.body.coments || classroom.coments
  classroom.save()
  return res.json(classroom)
})

router.post('/', (req, res) => {
  try {
    let newClassroom = {
      name: req.body.name,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      shift: req.body.shift,
      teacherId: req.body.teacherId,
      schoolId: req.body.schoolId,
      studentIds:[],
      coments:[]
    }
    new Classroom(newClassroom).save()
    res.json(newClassroom)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

router.post('/addStudent/:id', async (req, res) => {
  try {
    let classroom = await Classroom.findById(req.params.id);
    classroom.studentIds.push(req.body.studentId)
    classroom.save()
    res.json(classroom)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

router.post('/addComents/:id', async (req, res) => {
  try {
    let classroom = await Classroom.findById(req.params.id);
    let newComent = {
      teacherId: req.body.teacherId,
      coment: req.body.coment
    }
    classroom.coments.push(newComent)
    classroom.save()
    res.json(classroom)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

module.exports = router
