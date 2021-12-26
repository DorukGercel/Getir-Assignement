const express = require("express");
const validate = require("../middlewares/validate");
const {fetchRecords} = require("../controllers/Record");
const {ValidQueryBody} = require("../validators/Record");
const router = express.Router();

router.post("/", validate(ValidQueryBody, "body"), fetchRecords);

module.exports = router;