import { Request, Response } from "express"; 
import { ListServicesService } from "../../Services/services/ListServicesService";

class ListServicesController {
    async handle(req: Request, res: Response){

        const listServicesService = new ListServicesService();

        const service = await listServicesService.execute();

        return res.json(service);

    }
}

export { ListServicesController };