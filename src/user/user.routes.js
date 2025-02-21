import { Router } from "express";
import { actualizarUsuario} from "./user.controller.js";
import { updateUserValidator } from "../middlewares/validators.js";

const router = Router();

router.put("/updateUser/:uid", updateUserValidator, actualizarUsuario);

export default router;