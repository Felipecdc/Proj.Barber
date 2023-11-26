import prismaClient from "../../prisma";

class ListOrdersService {
    async excute(){

        const orders = await prismaClient.order.findMany();

        return { orders };

    }
}

export { ListOrdersService };