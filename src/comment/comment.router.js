import { Router } from "express"
import { crearComentario, editarComentario, eliminarComentario } from "./comment.controller.js"
import { createdComentarioValidator, updateComentarioValidator, deleteComentarioValidator  } from "../middlewares/validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

/**
 * @swagger
 * /agregarComentario:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto del comentario
 *               post:
 *                 type: string
 *                 description: ID de la publicación
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: El autor o la publicación no existen
 *       500:
 *         description: Error al crear el comentario
 */
router.post("/agregarComentario", createdComentarioValidator, deleteFileOnError, crearComentario)

/**
 * @swagger
 * /editComentario/{uid}:
 *   put:
 *     summary: Editar un comentario existente
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: No tienes permiso para editar este comentario
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error al actualizar el comentario
 */
router.put("/editComentario/:uid", updateComentarioValidator, deleteFileOnError, editarComentario)

/**
 * @swagger
 * /deleteComentario/{uid}:
 *   delete:
 *     summary: Eliminar un comentario existente
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: No tienes permiso para eliminar este comentario
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error al eliminar el comentario
 */
router.delete("/deleteComentario/:uid", deleteComentarioValidator, deleteFileOnError, eliminarComentario)

export default router

