import prismaClient from "../../prisma";

class ListServicesService {
    async execute(){

        const services = await prismaClient.services.findMany()

        return { services }

    }
}

export { ListServicesService };