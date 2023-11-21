import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    contato: string;
}

class CreateUserService {
    async execute({ name, email, password, contato}: UserRequest){

        if(!email){
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const createWallet = await prismaClient.wallet.create({
            data: {
                saldo: 0,
                transactions: {
                    create: [{
                        amount: 0,
                        type: "entrada"
                    }] 
                }
            },
            include: {
                transactions: true
            }
        })

        const passwordHash = await hash(password, 8)

        const createUser = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                contato: contato,
                wallet_id: createWallet.id
            }
        })

        const user = await prismaClient.user.update({
            where: {
                id: createUser.id,
            },
            data: {
                wallet_id: createWallet.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                contato: true
            }
        })

        return { user }
    }
}

export { CreateUserService }; 
