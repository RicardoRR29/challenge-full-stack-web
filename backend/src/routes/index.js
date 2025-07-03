const express = require("express");
const studentRoutes = require("./student.routes");

const router = express.Router();
router.use("/students", studentRoutes);

module.exports = router;

