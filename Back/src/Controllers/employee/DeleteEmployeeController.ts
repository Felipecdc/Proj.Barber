import { Request, Response } from "express";
import { DeleteEmployeeService } from "../../Services/employee/DeleteEmployeeService";

class DeleteEmployeeController {
    async handle(req: Request, res: Response){

        const employee_id = req.query.employee_id as string;

        const deleteEmployeeService = new DeleteEmployeeService();

        const employee = await deleteEmployeeService.execute({
            employee_id,
        })

        return res.json( employee )
    }
}

export { DeleteEmployeeController };