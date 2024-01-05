import prismaClient from "../../prisma";

interface UpdateRequest {
    service_id: string;
}

class UpdateServicesServices {
    async execute({ service_id }: UpdateRequest){

        const search = await prismaClient.services.findFirst({
            where: {
                id: service_id
            }
        })

        const boolean = !search.status

        const service = await prismaClient.services.update({
            where: {
                id: service_id,
            },
            data: {
                status: boolean,
                updated_at: new Date(),
            },
            select: {
                id: true,
                name: true,
                price: true,
                material: true,
                status: true,
            }
        })

        return { service }

    }  
}

export { UpdateServicesServices };