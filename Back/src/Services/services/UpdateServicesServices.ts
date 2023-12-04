import prismaClient from "../../prisma";

interface UpdateRequest {
    service_id: string;
    status: boolean;
}

class UpdateServicesServices {
    async execute({ service_id, status }: UpdateRequest){

        const service = await prismaClient.services.update({
            where: {
                id: service_id,
            },
            data: {
                status: status,
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