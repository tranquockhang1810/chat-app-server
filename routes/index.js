const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth/index"));
router.use("/api/v1/notifications", require("./firebase/index"));

module.exports = router;
