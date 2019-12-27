import express from "express"
import v1 from "./routes/v1"

const app = express()

// Set up router
app.use("/api", v1)

// Listen and serve
app.listen(8080, () => console.log(`Server listening on port ${8080}`))
