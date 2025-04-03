const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { getChatMessages, getChatList } = require("../../controllers/chat.controller");
const { validateGetChatParams } = require("../../middleware/validate/chat.validate");
const { validatePagination } = require("../../utils/ValidateModel");

/**
 * @swagger
 * /api/v1/chat/{userId}:
 *   get:
 *     summary: Get chat messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get chat successfully
 *       400:
 *         description: Invalid userId
 *       500:
 *         description: Server error
 * 
 */
router.get("/:userId", auth, validateGetChatParams, validatePagination, getChatMessages);

/**
 * @swagger
 * /api/v1/chat:
 *   get:
 *     summary: Get chat list
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get chat successfully
 *       500:
 *         description: Server error
 * 
 */
router.get("/", auth, validatePagination, getChatList);

module.exports = router;