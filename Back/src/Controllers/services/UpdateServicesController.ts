import { Response, Request } from "express";
import { UpdateServicesServices } from "../../Services/services/UpdateServicesServices";

class UpdateServicesController {
    async handle(req: Request, res: Response){

        const { service_id } = req.body;

        if(service_id === '') {
            return res.status(400).json({ error: 'Missing required parameters.' });
        }

        const updateServicesServices = new UpdateServicesServices();

        const service = await updateServicesServices.execute({
            service_id,
        })

        return res.json(service)

    }
}

export { UpdateServicesController };