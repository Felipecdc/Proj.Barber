import prismaClient from "../../prisma";

class CreateEmployeeServices {
    async execute(){
        return { ok: true }
    }
}

export { CreateEmployeeServices };