import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/user/UpdateUserService";

class UpdateUserController {
    async handle(req: Request, res: Response){

        try{
            const { user_id } = req.params;
            const { contato } = req.body;
    
            console.log(contato)
    
            const updateUserService = new UpdateUserService();
    
            const user = await updateUserService.execute({
                user_id: user_id,
                contato: contato
            })
    
            return res.json(user)
        }catch(err){
            console.log(err)
        }

    }
}

export { UpdateUserController };