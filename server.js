// Carregando modulos
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express()
  const test = require("./routes/test")
  const teacher = require("./routes/teacher")
  const student = require("./routes/student")
  const schoolRecord = require("./routes/schoolRecord")
  const classroom  = require("./routes/classroom")
  const mongoose = require("mongoose")

// Configurações
  // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/teste', { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {console.log("MongoDB Connection Succeeded.")})
    .catch( (error) => {console.log('Error in DB connection : ' + err)} )

// Rotas
  app.use("/tests", test)
  app.use("/teachers", teacher)
  app.use("/students", student)
  app.use("/schoolRecords", schoolRecord)
  app.use("/classrooms", classroom)
// Outros
  const PORT = 8081
  app.listen(PORT, () => {
      console.log('Express server started at port :'+ PORT);
  });
