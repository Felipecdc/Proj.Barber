import { Request, Response } from "express";
import { ListEmployeeService } from "../../Services/employee/ListEmployeeService";

class ListEmployeeController {
    async handle(req: Request, res: Response){

        const listEmployeeService = new ListEmployeeService();

        const employee = await listEmployeeService.execute();

        return res.json(employee)
    }
}

export { ListEmployeeController };