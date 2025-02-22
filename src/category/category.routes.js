import { Router } from "express"
import { crearCategoria ,editarCategorias, eliminarCategorias} from "./category.controller.js"
import { createdCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

/**
 * @swagger
 * /agregarCategoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Ya existe una categoría con este nombre
 *       500:
 *         description: Error al crear la categoría
 */
router.post("/agregarCategoria", createdCategoryValidator, deleteFileOnError, crearCategoria)

/**
 * @swagger
 * /editarCategoria/{uid}:
 *   put:
 *     summary: Editar una categoría existente
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameCategory:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la categoría
 */
router.put("/editarCategoria/:uid", updateCategoryValidator, deleteFileOnError, editarCategorias)

/**
 * @swagger
 * /eliminarCategoria/{uid}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada y publicaciones actualizadas a la categoría por defecto 'Noticias'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría y actualizar las publicaciones
 */
router.delete("/eliminarCategoria/:uid", deleteCategoryValidator, deleteFileOnError, eliminarCategorias)

export default router