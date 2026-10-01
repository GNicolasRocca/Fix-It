import { Router } from "express";
import { users_get_controller, user_get_id_controller, user_register_controller, user_login_controller } from "../controllers/users.controller";
import { validation_middleware } from "../middlewares/validation.middleware";
import { user_register_dto } from "../dtos/users.dto";
import { credential_dto } from "../dtos/credential.dto";

const router: Router = Router();

router.get("/", users_get_controller); 
router.get("/:id", user_get_id_controller); 
router.post("/register", validation_middleware(user_register_dto), user_register_controller);
router.post("/login", validation_middleware(credential_dto), user_login_controller);

export default router;