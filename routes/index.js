const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth/index"));
router.use("/api/v1/notifications", require("./firebase/index"));
router.use("/api/v1/chat", require("./chat/index"));
router.use("/api/v1/upload", require("./upload/index"));
router.use("/api/v1/user", require("./user/index"));

module.exports = router;
