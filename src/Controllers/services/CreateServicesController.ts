import { Request, Response } from "express";
import { CreateServicesServices } from "../../Services/services/CreateServicesServices";

class CreateServicesController {
    async handle(req: Request, res: Response){
        const { name, price, material } = req.body;

        const createServicesServices = new CreateServicesServices();

        const services = await createServicesServices.execute({
            name,
            price,
            material,
        })

        return res.json(services)
    }
}


export { CreateServicesController };