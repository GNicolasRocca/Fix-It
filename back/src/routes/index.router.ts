import { Router } from "express";
import users_router from "./users.router";
import appointments_router from "./appointments.router";

const router: Router = Router();

//De aca derivo hacia las routes correspondientes
router.use("/users", users_router);
router.use("/appointments", appointments_router);

export default router;