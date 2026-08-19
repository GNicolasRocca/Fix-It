import { Router } from "express";
import users_router from "../routes/user_router";
import turns_router from "../routes/turns_router";

const router: Router = Router();

//De aca derivo hacia las routes correspondientes
router.use("/users", users_router);
router.use("/turns", turns_router);

export default router;