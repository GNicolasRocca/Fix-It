import { Request, Response } from "express";
import { users_get_service, user_get_id_service, user_register_service, user_login_service } from "../handlers/users.service";
import { user_register_dto } from "../dtos/user.dto";
import { credentials_dto } from "../dtos/credential.dto";

const user_register_controller = async (req: Request<unknown, unknown, user_register_dto>, res: Response) => {
    try {
         const new_user = await user_register_service(req.body);

        res.status(201).json({
            message: "Usuario creado correctamente",
            data: new_user,
        })
    } catch (err) {
        res.status(400).json({
            message: "Error al crear un usuario", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const user_login_controller = async (req: Request<unknown, unknown, credentials_dto>, res: Response) => {
    try {
        console.log("BODY:", req.body);
        const user_found = await user_login_service(req.body.username, req.body.password);
        console.log("USUARIO ENCONTRADO:", user_found);

        res.status(200).json({
            login: true,
            user: user_found,
        })
        console.log(req.body);
    } catch(err) {
        res.status(400).json({
            message: "Datos incorrectos", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const users_get_controller = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json({
            message: "Obtuvó todos los usuarios",
            data: await users_get_service(),
        });
    } catch(err) {
        res.status(500).json({ 
            message: "Error al obtener todos los usuarios", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const user_get_id_controller = async (req: Request<{id: string}>, res: Response) => {
    try {
        res.status(200).json({
            message: "Obtuvó un usuario por id",
            data: await user_get_id_service(parseInt(req.params.id)),
        })
    } catch(err) {
        res.status(404).json({
            message: "Error al obtener un usuario por ID, usuario por id no encontrado", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

export { users_get_controller, user_get_id_controller, user_register_controller, user_login_controller };