import { Router } from "express"
import { crearComentario, editarComentario, eliminarComentario } from "./comment.controller.js"
import { createdComentarioValidator, updateComentarioValidator, deleteComentarioValidator  } from "../middlewares/validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.post("/agregarComentario", createdComentarioValidator, deleteFileOnError, crearComentario
)

router.put("/editComentario/:uid", updateComentarioValidator, deleteFileOnError, editarComentario)

router.delete("/deleteComentario/:uid", deleteComentarioValidator, deleteFileOnError,eliminarComentario)

export default router

