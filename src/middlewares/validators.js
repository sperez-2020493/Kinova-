import { body } from "express-validator";
import { emmailExist, usernameExist, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js"
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("User is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is envalide"),
    body("password").not().isEmpty().withMessage("Password is envalide"),
    body("email").custom(emmailExist),
    body("username").custom(usernameExist),
   /*body("password").isStrongPassword({
        minLength: 8,

        })*/
        validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]