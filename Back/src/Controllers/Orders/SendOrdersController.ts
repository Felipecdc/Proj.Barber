import { Request, Response } from "express";
import { SendOrdersService } from "../../Services/Orders/SendOrdersService";

class SendOrdersController {
    async handle(req: Request, res: Response){

        const { order_id } = req.body;

        console.log(order_id)

        const sendOrdersService = new SendOrdersService();

        const order = await sendOrdersService.execute({
            order_id,
        });

        return res.json(order)

    }
}

export { SendOrdersController };