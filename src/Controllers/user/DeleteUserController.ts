import { Response, Request } from "express";
import { DeleteUserService } from "../../Services/user/DeleteUserService";

class DeleteUserController {
    async handle(req: Request, res: Response){

        const user_id = req.query.user_id as string;
        
        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute({
            user_id
        })

        return res.json(user)




    }
}

export { DeleteUserController };