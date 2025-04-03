const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { searchUsers } = require("../../controllers/user.controller");
const { validateSearchUser } = require("../../middleware/validate/user.validate");
const { validatePagination } = require("../../utils/ValidateModel");

/**
 * @swagger
 * /api/v1/user/search:
 *   get:
 *     summary: Search users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
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
 *         description: Search users successfully
 *       500:
 *         description: Server error
 * 
 */
router.get("/search", auth, validateSearchUser , validatePagination, searchUsers);

module.exports = router;