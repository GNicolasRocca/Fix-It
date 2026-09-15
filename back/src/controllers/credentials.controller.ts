import { credential_register_DTO } from "../dtos/credential.dto";
import { credential_register_service } from "../handlers/credentials.service";

const credential_register_controller = async (req: Request<unknown, unknown, credential_register_DTO>, res: Response): Promise<void> => {
    try{
        res.status(201).json({
            msg: "Creó un nuevo usuario",
            data: await credential_register_service(req.body)    
        });
    } catch(err){
        res.status(400).json({
            message: "Error al crear un nuevo usuario", 
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

export { credential_register_controller };