import { Request, Response } from "express";
import { CreateEmployeeServices } from "../../Services/employee/CreateEmployeeServices";

class CreateEmployeeController {
    async handle(req: Request, res: Response){

        const { name, email, password, contato, percentage } = req.body;

        const createEmployeeServices = new CreateEmployeeServices();

        const employee = await createEmployeeServices.execute({
            name,
            email,
            password,
            contato,
            percentage,
        })

        return res.json(employee)
    }
}

export { CreateEmployeeController }; 