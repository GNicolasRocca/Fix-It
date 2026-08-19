import { CredentialRepository } from "../repositories/Credential.repository";
import { Credential } from "../entities/Credentials.entity";

const check_credentials = async (username: string): Promise<void> => {
    const credential_found: Credential | null = await CredentialRepository.findOne({
        where:{
            username: username
        }
    })
    if(credential_found) throw new Error(`El ${username} ya existe`);
}

const create_credentials = async (username: string, password: string): Promise<Credential> => {
    try{
       check_credentials(username);

        const new_credential = CredentialRepository.create({
            username: username,
            password: password
        })

        return await CredentialRepository.save(new_credential); 
    } catch(error){
        if(error instanceof Error) throw Error(error.message)
        else throw Error("Error desconocido")
    }
}


// esto deberia ponerlo en el testing
/*
const testeando = () => {
    const prueba_1 = create_credentials("Gonzalo", "gonza1234");
    const prueba_2 = create_credentials("Roberto", "rober1234");
    const prueba_3 = create_credentials("Ricardo", "ricardo1234");

    console.log(id);
    console.log(prueba_1);
    console.log(prueba_2);
    console.log(prueba_3);
    console.log(credentials_array);
}

testeando();
*/

const check_credentials_login = async (username: string, password: string): Promise<number> => {
    const credential_find: Credential | null = await CredentialRepository.findOne({
        where: {
            username: username,
            password: password
        } 
    });
    if(!credential_find) throw new Error(`El nombre de usuario o contraseña es incorrecta`);

    return credential_find.id;
}

// console.log("Chequeo de la funcion de validacion de usuario y contraseña",check_credentials_login("Ricardo", "ricardo1234"));

export { create_credentials, check_credentials_login };