import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string){

        const user = prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                contato: true,
                owner: true,
                employee: true,
            }
        })

        return user;
    }
}

export { DetailUserService };