import { Router } from "express";
import { actualizarUsuario} from "./user.controller.js";
import { updateUserValidator } from "../middlewares/validators.js";

const router = Router();

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The user's unique ID.
 *         schema:
 *           type: string
 *       - in: body
 *         name: name
 *         type: string
 *         description: The user's name.
 *       - in: body
 *         name: surname
 *         type: string
 *         description: The user's surname.
 *       - in: body
 *         name: username
 *         type: string
 *         description: The user's username.
 *       - in: body
 *         name: email
 *         type: string
 *         description: The user's email.
 *       - in: body
 *         name: phone
 *         type: string
 *         description: The user's phone number.
 *     responses:
 *       200:
 *         description: User information updated
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */
router.put("/updateUser/:uid", updateUserValidator, actualizarUsuario);

export default router;