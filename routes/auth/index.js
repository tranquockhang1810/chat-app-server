const express = require("express");
const { register, login } = require("../../controllers/auth.controller");
const router = express.Router();
const upload = require("../../middleware/upload");
const { validateRegister, validateLogin } = require("../../middleware/validate/auth.validate");

//Login
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Invalid phone or password
 *       500:
 *         description: Server error
 * 
 */
router.post("/login", validateLogin, login);

//Register
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               birthDate:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: file
 *                 format : binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/register", upload.single("avatar"), validateRegister, register);


module.exports = router;