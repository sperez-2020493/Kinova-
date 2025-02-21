import { Router } from "express"
import { crearCategoria ,editarCategorias, eliminarCategorias} from "./category.controller.js"
import { createdCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.post("/agregarCategoria", createdCategoryValidator, deleteFileOnError,crearCategoria
)

router.put("/editarCategoria", updateCategoryValidator, deleteFileOnError,editarCategorias
)

router.put("/eliminarCategoria", deleteCategoryValidator, deleteFileOnError,eliminarCategorias
)

export default router