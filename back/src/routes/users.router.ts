import { Router } from "express";
import { users_get_controller, user_get_id_controller, user_register_controller, user_login_controller, user_get_id_admin_controller } from "../controllers/users.controller";
import { validation_middleware } from "../middlewares/validation.middleware";
import { user_register_dto } from "../dtos/users.dto";
import { credential_dto } from "../dtos/credential.dto";
import { auth_middleware } from "../middlewares/auth.middleware";
import { role_middleware } from "../middlewares/role.middleware";
import { Role } from "../interfaces/IRole";

const router: Router = Router();

router.post("/register", validation_middleware(user_register_dto), user_register_controller);
router.post("/login", validation_middleware(credential_dto), user_login_controller);
router.get("/", auth_middleware, role_middleware(Role.admin), users_get_controller); 
router.get("/user", auth_middleware, user_get_id_controller); 
router.get("/get-user/:id", auth_middleware, role_middleware(Role.admin), user_get_id_admin_controller);
// falta poder editar el usuario
// Poder borrar el usuario


export default router;