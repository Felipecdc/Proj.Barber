import prismaClient from "../../prisma";

interface UpdateRequest {
    user_id: string;
    contato: string;
}

class UpdateUserService {
    async execute({ user_id, contato }:UpdateRequest){

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                contato: contato
            }
        })

        return { ok: true }

    }
}

export { UpdateUserService };