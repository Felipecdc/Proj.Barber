import prismaClient from "../../prisma";

interface DeleteRequest {
    employee_id: string;
}

class DeleteEmployeeService {
    async execute({ employee_id }: DeleteRequest){
        
        const employee = await prismaClient.employee.delete({
            where: {
                id: employee_id,
            }
        })

        return { employee }

    }
}

export { DeleteEmployeeService };