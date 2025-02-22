import { body,param } from "express-validator";
import { emmailExist, usernameExist, userExists} from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js";


export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("User is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is envalide"),
    body("password").not().isEmpty().withMessage("Password is envalide"),
    body("email").custom(emmailExist),
    body("username").custom(usernameExist),
   body("password").isStrongPassword({
        minLength: 4,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
        }),
        validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]

export const updateUserValidator = [
    validateJWT,
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
]

export const createdCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameCategory").notEmpty().withMessage("El nombre de la categoria es requerido"),
    body("description").notEmpty().withMessage("La descripcion de la categoria es requerida"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    body("nameCategory").notEmpty().withMessage("El nombre de la categoria es requerido"),
    body("nameCategory").custom(usernameExist),
    body("description").notEmpty().withMessage("La descripcion de la categoria es requerida"),
    validarCampos,
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    validarCampos,
]

export const createdPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validarCampos
]


export const editdPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    validarCampos
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    validarCampos
]

export const createdComentarioValidator = [
    validateJWT,
    body("text").notEmpty().withMessage("El text del comentario es requerido"),
    hasRoles("USER_ROLE"),
    validarCampos
]


export const updateComentarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    validarCampos
]

export const deleteComentarioValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    validarCampos
]