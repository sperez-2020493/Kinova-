import { Router } from "express";
import { crearPost, editarPost, eliminarPost} from "./post.controller.js";
import { createdPostValidator,editdPostValidator, deletePostValidator } from "../middlewares/validators.js";

const router = Router();

router.post("/newPost", createdPostValidator,crearPost);
router.put("/editPost/:uid", editdPostValidator,editarPost);
router.delete("/deletePost/:uid", deletePostValidator,eliminarPost);

export default router;