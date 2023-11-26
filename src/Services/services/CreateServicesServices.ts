import prismaClient from "../../prisma";

interface ServiceRequest {
    name: string;
    price: number;
    material?: string;
}

class CreateServicesServices {
    async execute({ name, price, material }: ServiceRequest){
        
        const service = await prismaClient.services.create({
            data: {
                name: name,
                price: price,
                material: material,
            }
        })

        return { service }
    }
}

export { CreateServicesServices };