import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response){
        console.log('Chegou na rota de atualização de usuário');
        try{
            const { user_id } = req.params;
            const { contato } = req.body;
        
            const updateUserService = new UpdateUserService();
    
            const { originalname, filename: avatar } = req.file || {};

            const user = await updateUserService.execute({
                user_id: user_id,
                contato: contato,  
                avatar: avatar
            })
            
            return res.json(user)
        }catch(err){
            console.log(err)
        }

    }
}

export { UpdateUserController };