import { Router } from "express";
import { turns_get, turns_get_id, turns_post, turns_put } from "../controllers/turns_controllers";

const router: Router = Router(); 

router.get("/", turns_get);
router.get("/:id", turns_get_id); 
router.post("/schedule", turns_post);
router.put("/cancel/:id", turns_put);

export default router;