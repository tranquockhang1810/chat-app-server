const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { uploadImages } = require("../../controllers/upload.controller");
const upload = require("../../middleware/upload");
const { validateUploadImages } = require("../../middleware/validate/upload.validate");

/**
 * @swagger
 * /api/v1/upload/images:
 *   post:
 *     summary: Upload images to Cloudinary (Max 5 images)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                   required: true
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: No files uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/images", auth, upload.array("images", 5), validateUploadImages, uploadImages);

module.exports = router;