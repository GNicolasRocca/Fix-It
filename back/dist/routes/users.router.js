"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const users_dto_1 = require("../dtos/users.dto");
const credential_dto_1 = require("../dtos/credential.dto");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const IRole_1 = require("../interfaces/IRole");
const router = (0, express_1.Router)();
router.post("/register", (0, validation_middleware_1.validation_middleware)(users_dto_1.user_register_dto), users_controller_1.user_register_controller);
router.post("/login", (0, validation_middleware_1.validation_middleware)(credential_dto_1.credential_dto), users_controller_1.user_login_controller);
router.get("/", auth_middleware_1.auth_middleware, (0, role_middleware_1.role_middleware)(IRole_1.Role.admin), users_controller_1.users_get_controller);
router.get("/user", auth_middleware_1.auth_middleware, users_controller_1.user_get_id_controller);
router.get("/get-user/:id", auth_middleware_1.auth_middleware, (0, role_middleware_1.role_middleware)(IRole_1.Role.admin), users_controller_1.user_get_id_admin_controller);
router.put("/edit", (0, validation_middleware_1.validation_middleware)(users_dto_1.user_edit_dto), auth_middleware_1.auth_middleware, users_controller_1.user_edit_controller); // Me parece que conviene cambiar el login con username por el mail
router.put("/delete", auth_middleware_1.auth_middleware, users_controller_1.user_delete_controller);
// poder borrar usuario por su id ADMIN
exports.default = router;
