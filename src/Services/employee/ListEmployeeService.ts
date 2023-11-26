import prismaClient from "../../prisma";

class ListEmployeeService {
    async execute(){
        
        const employee = await prismaClient.employee.findMany();

        return { employee };

    }
}

export { ListEmployeeService };