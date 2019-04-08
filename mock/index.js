const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app =express()

const jobDiary = require('./jobDiary')
const Finance = require('./Finance')
const Staff = require('./Staff')
const Department = require('./Department')
const user = require('./user')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(jobDiary)
app.use(Finance)
app.use(Staff)
app.use(Department)
app.use(user)

app.listen(4444, () => {
  console.log('Mock server is running on PORT 444')
})