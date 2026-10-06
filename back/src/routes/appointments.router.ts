import { Router } from "express";
import { appointment_create_controller, appointment_cancel_controller, appointments_get_by_user_controller, appointments_get_controller, appointments_get_id_controller, appointments_get_by_user_admin_controller } from "../controllers/appointments.controller";
import { validation_middleware } from "../middlewares/validation.middleware";
import { auth_middleware } from "../middlewares/auth.middleware";
import { calendar_appointment_dto } from "../dtos/appointments.dto";
import { role_middleware } from "../middlewares/role.middleware";
import { Role } from "../interfaces/IRole";

const router: Router = Router(); 

router.get("/", auth_middleware, role_middleware(Role.admin), appointments_get_controller);
router.get("/my-appointments", auth_middleware, appointments_get_by_user_controller);
router.get("/user/:id", auth_middleware, role_middleware(Role.admin), appointments_get_by_user_admin_controller)
router.get("/:id", auth_middleware, role_middleware(Role.admin), appointments_get_id_controller); 
router.post("/schedule", auth_middleware, validation_middleware(calendar_appointment_dto),appointment_create_controller);
router.put("/cancel/:id", auth_middleware, appointment_cancel_controller);

export default router;