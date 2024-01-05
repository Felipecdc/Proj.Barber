import prismaClient from "../../prisma";

class ListUserService {
    async execute(){
        
        const users = await prismaClient.user.findMany({
            where: {
                owner: false,
                employee: false,
            }
        })

        return { users }

    }
}

export { ListUserService };