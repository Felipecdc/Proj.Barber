import prismaClient from "../../prisma";

interface UpdateRequest {
    user_id: string;
    contato?: string;
    avatar?: string;
}

class UpdateUserService {
    async execute({ user_id, contato, avatar }:UpdateRequest){

        if(avatar){
            const user = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    contato: contato,
                    avatar_url: avatar
                }
            })
            return { user }
        }else{
            const user = await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    contato: contato,
                }
            })
            return { user }
        }



    }
}

export { UpdateUserService };