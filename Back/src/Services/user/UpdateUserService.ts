import prismaClient from "../../prisma";

interface UpdateRequest {
    user_id: string;
    contato?: string;
    avatar?: string | null;
}

class UpdateUserService {
    async execute({ user_id, contato, avatar }:UpdateRequest){
        let dataToUpdate: {
            contato?: string;
            avatar_url?: string;
        } = {};

        if (contato !== undefined) {
            dataToUpdate.contato = contato;
        }

        if (avatar !== undefined) {
            dataToUpdate.avatar_url = avatar;
        }

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: dataToUpdate
        });

        return { user };
    }
}

export { UpdateUserService };