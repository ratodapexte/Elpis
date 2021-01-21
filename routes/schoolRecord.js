const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/SchoolRecord")
const SchoolRecord = mongoose.model("schoolRecords")

router.get('/', async (req, res) => {
  let allRecords = await SchoolRecord.find({})
  return res.json(allRecords);
})

router.get('/:id', async (req, res) => {
  let record = await SchoolRecord.findById(req.params.id);
  return res.json(record);
})

router.delete('/:id', async (req, res) => {
  await SchoolRecord.findByIdAndRemove(req.params.id);
  return res.json({message:"Remove"});
})

router.put("/:id", async (req, res) =>{
  let schoolRecord = await SchoolRecord.findById(req.params.id);
  schoolRecord.classroomId = req.body.classroomId || schoolRecord.classroomId
  schoolRecord.teacherId = req.body.teacherId || schoolRecord.teacherId
  schoolRecord.schoolId = req.body.schoolId || schoolRecord.schoolId
  schoolRecord.testIds = req.body.testIds || schoolRecord.testIds
  schoolRecord.save()
  return res.json(schoolRecord)
})

router.post("/addTest/:id", async(req, res) =>{
    let schoolRecord = await SchoolRecord.findById(req.params.id);
    schoolRecord.testIds.push(req.body.testId)
    schoolRecord.save()
    return res.json(schoolRecord)
})

router.post('/', (req, res) => {
  try {
    let newSchoolRecord = {
      classromId: req.body.classromId,
      teacherId: req.body.teacherId,
      schoolId: req.body.schoolId,
      testIds:[]
    }
    new SchoolRecord(newSchoolRecord).save()
    res.json(newSchoolRecord)
  }catch{
    res.json({error:{code:2, message:"Error"}})
  }
});

module.exports = router
