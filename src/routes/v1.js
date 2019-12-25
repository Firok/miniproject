import express from "express"
import bodyParser from "body-parser"
import LocationsHandler from  "../handlers/LocationsHandler"

const router = express.Router()

// Middleware
router.use(bodyParser.json())

/*
 * Routes
 */

router.route("/get_distance_and_time")
  .post(LocationsHandler.onPost)

export default router
