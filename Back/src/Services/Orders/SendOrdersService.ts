import prismaClient from "../../prisma";

interface SendRequest {
    order_id: string;
}

class SendOrdersService {
    async execute({ order_id }: SendRequest){

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                status: true
            }
        })

        return { order }
    }
}

export { SendOrdersService };