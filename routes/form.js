const express = require("express");
const router = express.Router();

const form = require("../controllers/form");

router.post("/submit-data", form.submitUser);
router.get("/get-users", form.getUsers);

module.exports = router;
