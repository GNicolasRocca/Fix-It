import { Request, Response } from "express";
import { users_get_service, user_get_id_service, user_register_service, user_login_service, user_get_id_admin_service, user_edit_service } from "../handlers/users.service";
import { user_edit_dto, user_register_dto } from "../dtos/users.dto";
import { credential_dto } from "../dtos/credential.dto";
import { generate_token } from "../utils/jwt";

const user_register_controller = async (req: Request<unknown, unknown, user_register_dto>, res: Response) => {
    try {
         const new_user = await user_register_service(req.body);

        res.status(201).json({
            message: "Usuario creado correctamente",
            data: {
                id: new_user.id,
                name: new_user.name,
                email: new_user.email,
                birthdate: new_user.birthdate,
                nDni: new_user.nDni,
                role: new_user.role,

                credentialId: new_user.credentials.id,
                username: new_user.credentials.username,
            },
        })
    } catch (err) {
        res.status(400).json({
            message: "Error al crear un usuario", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const user_login_controller = async (req: Request<unknown, unknown, credential_dto>, res: Response) => {
    try {
        const user_found = await user_login_service(req.body);

        const token = generate_token(user_found.user.id, user_found.user.role);

        res.status(200).json({
            login: true,
            user: {
                id: user_found.id,
                username: user_found.username,

                userId: user_found.user.id,
                name: user_found.user.name,
                email: user_found.user.email,
                birthdate: user_found.user.birthdate,
                nDni: user_found.user.nDni,
                role: user_found.user.role
            },
            token,
        })

    } catch (err) {
        res.status(401).json({
            message: "Datos incorrectos", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const users_get_controller = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
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

const user_get_id_controller = async (req: Request, res: Response) => {
    try {
        const user = await user_get_id_service(req.userId!);

        res.status(200).json({
            message: "Obtuvó su usuario por su id",
            data: {
                userId: user.id,
                email: user.email,
                name: user.name,
                birthdate: user.birthdate,
                nDni: user.nDni,
                role: user.role,
                createAt: user.createAt,
                updateAt: user.updateAt,
                appointments: user.appointments,

                credentialId: user.credentials.id,
                username: user.credentials.username,
            }
        })
    } catch(err) {
        res.status(404).json({
            message: "Error al obtener su usuario por su ID, usuario por su ID no encontrado", 
            error: err instanceof Error ? err.message: "Error desconocido",
        });
    }
}

const user_get_id_admin_controller = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user_found = await user_get_id_admin_service(req.params.id);

        res.status(200).json({
            message: "Obtuvó un usuario por su id",
            data: {
                userId: user_found.id,
                email: user_found.email,
                birthdate: user_found.birthdate,
                nDni: user_found.nDni,
                role: user_found.role,
                createAt: user_found.createAt,
                updateAt: user_found.updateAt,
                appointments: user_found.appointments,

                credentialId: user_found.credentials.id,
                username: user_found.credentials.username,
            }
        })
    } catch (err) {
        res.status(404).json({
            message: "Error al obtener un usuario por su ID, usuario por su ID no encontrado",
            error: err instanceof Error ? err.message: "Error desconocido",
        })
    }
}

const user_edit_controller = async (req: Request<unknown, unknown, user_edit_dto>, res: Response) => {
    try {
        const user_edit = await user_edit_service(req.userId!, req.body);

        res.status(200).json({
            message: "Modificó su usuario",
            data: {
                userId: user_edit.id,
                email: user_edit.email,
                name: user_edit.name,
                birthdate: user_edit.birthdate,
                nDni: user_edit.nDni,
                role: user_edit.role,
                createAt: user_edit.createAt,
                updateAt: user_edit.updateAt,
                appointments: user_edit.appointments,

                credentialId: user_edit.credentials.id,
                username: user_edit.credentials.username,
            }
        })

    } catch (err) {
        res.status(400).json({
            message: "Error al modificar usuario",
            error: err instanceof Error ? err.message: "Error desconocido",
        })
    }
}

export { user_register_controller, user_login_controller, users_get_controller, user_get_id_controller, user_get_id_admin_controller, user_edit_controller };