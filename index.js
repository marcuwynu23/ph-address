require("dotenv").config()
const express = require('express')
const cors = require('cors')

const controller = require('./controller')

const morgan = require("morgan")
const app = express()


app.use(morgan("combined"))
app.use(cors())


app.get('/', controller.HOME);
app.use("/api/v1/ph/regions", controller.REGIONS)
app.use("/api/v1/ph/provinces", controller.PROVINCES)
app.use("/api/v1/ph/citymuns", controller.CITYMUNS)
app.use("/api/v1/ph/barangays", controller.BARANGAYS)


app.listen((process.env.PORT | 3000), process.env.ADDR | "0.0.0.0", () => {
	console.log("Server is running on " + (process.env.ADDR || "0.0.0.0") + ":" + (process.env.PORT | 3000))
})