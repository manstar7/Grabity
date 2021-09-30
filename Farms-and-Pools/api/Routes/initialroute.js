const express = require("express");
var router = express.Router();
const { getRequests,createRequest,updateRequest} = require("../Controllers/initialController");

router.get("/getRequests", getRequests)
router.post("/createWarp",createRequest)
router.post("/updateWarp",updateRequest)
module.exports = router;