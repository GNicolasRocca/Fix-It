import { Request, Response } from "express";
import { get_users_service, get_user_id_service, user_register_service, user_login_service } from "../handlers/users.service";
import { user_login_DTO, user_register_DTO } from "../DTOs/user_DTOs";

const users_get = async (req: Request, res: Response): Promise<void> => {
    try{
        res.json({
            message: "Obtuvó todos los usuarios",
            data: await get_users_service()
        });
    } catch(err){
        res.status(500).json({ 
            message: "Error al obtener todos los usuarios", 
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const users_get_id = async (req: Request<{id: string}>, res: Response) => {
    try{
        res.status(200).json({
            message:"Obtuvó un usuario por id",
            data: await get_user_id_service(parseInt(req.params.id))
        })
    } catch(err){
        res.status(404).json({
            message: "Error al obtener un usuario por ID, usuario por id no encontrado", 
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const users_post_register = async (req: Request<unknown, unknown, user_register_DTO>, res: Response): Promise<void> => {
    try{
        res.status(201).json({
            msg: "Creó un nuevo usuario",
            data: await user_register_service(req.body)    
        })
        console.log(req.body);
    } catch(err){
        res.status(400).json({
            message: "Error al crear un nuevo usuario, datos incorrectos", 
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const users_post_login = async (req: Request<unknown, unknown, user_login_DTO>, res: Response) => {
    try{
        console.log("BODY:", req.body);
        const user_found = await user_login_service(req.body.username, req.body.password);
        console.log("USUARIO ENCONTRADO:", user_found);

        res.status(200).json({
            login: true,
            user: user_found
        })
        console.log(req.body);
    } catch(err){
        res.status(400).json({
            message: "Datos incorrectos", 
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}
// no me esta trayendo los datos del user, solo me dice login true

export { users_get, users_get_id, users_post_register, users_post_login };