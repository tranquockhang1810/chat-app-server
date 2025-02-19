const express = require("express");
const { register, login } = require("../../controllers/user.controller");

const router = express.Router();
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");

//Login
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
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
router.post("/login", login);

//Register
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register
 *     tags: [Users]
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
router.post("/register", upload.single("avatar"), register);


module.exports = router;