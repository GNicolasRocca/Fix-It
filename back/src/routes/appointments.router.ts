import { Router } from "express";
import { appointment_create_controller, appointment_edit_controller, appointments_get_controller, appointments_get_id_controller } from "../controllers/appointments.controller";
import { auth_middleware } from "../middlewares/auth.middleware";

const router: Router = Router(); 

router.get("/", appointments_get_controller);
router.get("/user/:userId", auth_middleware, appointments_get_id_controller);
router.get("/:id", appointments_get_id_controller); 
router.post("/schedule", auth_middleware, appointment_create_controller);
router.put("/cancel/:id", auth_middleware, appointment_edit_controller);

export default router;