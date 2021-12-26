const express = require("express");
const { handlePageNotFound } = require("../controllers/Error");
const router = express.Router();

router.use(handlePageNotFound);

module.exports = router;