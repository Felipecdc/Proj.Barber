import prismaClient from "../../prisma";

interface OrderRequest {
    name: string;
    profissional: string;
    data: string;
    horario: string;
    services: string;
}

class CreateOrdersService {
    async execute({ name, profissional, data, horario, services }: OrderRequest){
        
        const service = await prismaClient.services.findFirst({
            where: {
                name: services,
            }
        })
        
        if (!service) {
            throw new Error(`Serviço ${services} não encontrado.`);
        }

        const order = await prismaClient.order.create({
            data: {
                name: name,
                valor: service.price,
                profissional: profissional,
                data: data,
                horario: horario,
                services: service.name
            }
        })


        return { order }
    }
}

export { CreateOrdersService }; 