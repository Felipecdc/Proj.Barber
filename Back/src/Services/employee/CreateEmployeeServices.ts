import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface EmployeeRequest {
    name: string;
    email: string;
    password: string;
    contato: string;
    percentage?: number
}

class CreateEmployeeServices {
    async execute({ name, email, password, contato, percentage}: EmployeeRequest){

        if(name === '' || email === '' || password === '' || contato === ''){
            throw new Error("Some info is empty")
        }

        const userAlreadyExists = await prismaClient.employee.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }
        
        try{
            const passwordHash = await hash(password, 8)

            const employee = await prismaClient.employee.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    contato: contato,
                    percentage: percentage
                }
            })

            return { employee }
        
        }catch(err){
            throw new Error(err.message)
        }

    }
}
 
export { CreateEmployeeServices };