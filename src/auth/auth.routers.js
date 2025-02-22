import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator,} from "../middlewares/validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profilePicture
 *         type: file
 *         description: The user's profile picture.
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: The user's name.
 *       - in: formData
 *         name: surname
 *         type: string
 *         required: true
 *         description: The user's surname.
 *       - in: formData
 *         name: username
 *         type: string
 *         required: true
 *         description: The user's username.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: The user's phone number.
 *     responses:
 *       201:
 *         description: User has been created
 *       500:
 *         description: User registration failed
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    deleteFileOnError,
    register
)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email.
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *         description: The user's username.
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 */
router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router