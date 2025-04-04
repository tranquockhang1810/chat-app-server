const express = require("express");
const router = express.Router();

const { sendNotification } = require("../../controllers/notification.controller");

/**
 * @swagger
 * /api/v1/users/notification:
 *   post:
 *     summary: Send notification
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Token, title and body are required
 *       500:
 *         description: Error sending notification
 */
router.post("/notification", sendNotification);

module.exports = router;