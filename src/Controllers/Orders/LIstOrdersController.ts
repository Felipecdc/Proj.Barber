import { Response, Request } from "express";
import { ListOrdersService } from "../../Services/Orders/ListOrdersService";

class LIstOrdersController {
    async handle(req: Request, res: Response){

        const listOrdersService = new ListOrdersService();

        const orders = await listOrdersService.excute();

        return res.json(orders)

    }
}

export { LIstOrdersController };