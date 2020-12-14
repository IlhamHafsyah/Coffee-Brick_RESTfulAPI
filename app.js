require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// const appHost = process.env.DB_HOST
// const appUser = process.env.DB_USER
// const appPass = process.env.DB_PASSWORD
// const appName = process.env.DB_NAME
// const appTime = process.env.DB_TIMEZONE
// ====================
// console.log(appHost)
// console.log(appUser)
// console.log(appPass)
// console.log(appName)
// console.log(appTime)
// ====================
const routesNavigation = require('./src/routesNavigation')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// ====================
app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})
// ====================

app.use('/', routesNavigation)

app.get('*', (request, response) => {
  response.status(404).send('Path not found !')
})

app.listen(4000, () => {
  console.log('Express app is listening on port 4000')
})
