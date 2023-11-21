import { Request, Response } from "express";
import { CreateEmployeeServices } from "../../Services/employee/CreateEmployeeServices";

class CreateEmployeeController {
    async handle(req: Request, res: Response){

        const createEmployeeServices = new CreateEmployeeServices();

        const employee = await createEmployeeServices.execute()

        return res.json(employee)
    }
}

export { CreateEmployeeController };