import { Router } from "express";
import { crearPost, editarPost, eliminarPost} from "./post.controller.js";
import { createdPostValidator,editdPostValidator, deletePostValidator } from "../middlewares/validators.js";

const router = Router();

/**
 * @swagger
 * /newPost:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *               bodyPost:
 *                 type: string
 *                 description: Cuerpo de la publicación
 *               category:
 *                 type: string
 *                 description: ID de la categoría
 *     responses:
 *       200:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: El autor o la categoría no existen
 *       500:
 *         description: Error al crear la publicación
 */
router.post("/newPost", createdPostValidator, crearPost)

/**
 * @swagger
 * /editPost/{uid}:
 *   put:
 *     summary: Editar una publicación existente
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *               bodyPost:
 *                 type: string
 *                 description: Cuerpo de la publicación
 *     responses:
 *       200:
 *         description: Publicación actualizada correctamente
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: No tienes permiso para editar esta publicación
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error al actualizar la publicación
 */
router.put("/editPost/:uid", editdPostValidator, editarPost)

/**
 * @swagger
 * /deletePost/{uid}:
 *   delete:
 *     summary: Eliminar una publicación existente
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada correctamente
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: No tienes permiso para eliminar esta publicación
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error al eliminar la publicación
 */
router.delete("/deletePost/:uid", deletePostValidator, eliminarPost)

export default router;