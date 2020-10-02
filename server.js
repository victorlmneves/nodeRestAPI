const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const corsOptions = {
  origin: "http://localhost:8080",
}

app.use(cors(corsOptions))

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of middleware
  next()
})

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")

// db.sequelize.sync({ force: 1 }).then(() => {
//   console.log("Drop and re-sync db.")
// })

db.sequelize.sync()

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodeRestAPI application." })
})

require("./app/routes/tutorial.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
