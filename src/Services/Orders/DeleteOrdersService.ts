import prismaClient from "../../prisma";

interface DeleteRequest {
    order_id: string;
}

class DeleteOrdersService {
    async execute({order_id}:DeleteRequest){

        const findOrder = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            }
        })

        if (!findOrder) {
            throw new Error("Order not found");
        }

        if(findOrder.status === true){
            throw new Error("This order was already finalized");
        }

        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return { order }

    }
}

export { DeleteOrdersService };