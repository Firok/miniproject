import express from "express"
import http from "http"
import v1 from "./routes/v1"
import { onError } from "./handlers/JSONErrorHandler"

const app = express()

// Set up router
app.use("/api", v1)

// Handle error
app.use(onError)

const server = http.createServer(app)

// Listen and serve
server.listen(8080, () => console.log(`Server listening on port ${8080}`))
