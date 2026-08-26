import { Router } from "express";
import users_router from "./user.router";
import turns_router from "./appointments.router";

const router: Router = Router();

//De aca derivo hacia las routes correspondientes
router.use("/users", users_router);
router.use("/turns", turns_router);

export default router;