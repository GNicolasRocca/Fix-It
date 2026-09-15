import { Router } from "express";
import { users_get_controller, user_get_id_controller, user_register_controller, user_login_controller } from "../controllers/users.controller";

const router: Router = Router();

router.get("/", users_get_controller); 
router.get("/:id", user_get_id_controller); 
router.post("/register", user_register_controller);
router.post("/login", user_login_controller);

export default router;