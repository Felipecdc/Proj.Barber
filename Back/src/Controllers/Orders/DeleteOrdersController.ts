import { Response, Request } from "express";
import { DeleteOrdersService } from "../../Services/Orders/DeleteOrdersService";

class DeleteOrdersController {
    async handle(req: Request, res: Response){

        const { order_id } = req.body;

        const deleteOrdersService = new DeleteOrdersService();

        const order = await deleteOrdersService.execute({
            order_id,
        });

        return res.json(order)

    }
}

export { DeleteOrdersController };