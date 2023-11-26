import { Request, Response } from 'express'
import { CreateUserService } from '../../Services/user/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response){
        const { name, email, password, contato, owner} = req.body;
        
        if(name === '' || email === '' || password === ''){
            throw new Error("Error when registering, please make sure all fields are filled in")
        }
        
        const createUserService =  new CreateUserService();
        const user = await createUserService.execute({
            name, 
            email, 
            password,
            contato,
            owner,
        }); 

        return res.json(user)

    }
}

export { CreateUserController };