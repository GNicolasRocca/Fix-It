import { Router } from "express";
import { users_get, users_get_id, users_post_register, users_post_login } from "../controllers/users.controller";

const router: Router = Router();

router.get("/", users_get); 
router.get("/:id", users_get_id); 
router.post("/register", users_post_register);
router.post("/login", users_post_login);

export default router;