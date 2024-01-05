import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
    contato: string;
    owner: boolean;
}

class CreateUserService {
    async execute({ name, email, password, contato, owner}: UserRequest){

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

        try{
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
            console.log("CreateUserService: Wallet created", createWallet);
    
            const passwordHash = await hash(password, 8)
    
            const createUser = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    contato: contato,
                    owner: owner,
                    avatar_url: null,
                    // wallet_id: createWallet.id
                    carteira: {
                        connect: {
                            id: createWallet.id
                        }
                    }
                }
            })
    
            // const user = await prismaClient.user.update({
            //     where: {
            //         id: createUser.id,
            //     },
            //     data: {
            //         wallet_id: createWallet.id
            //     },
            //     select: {
            //         id: true,
            //         name: true,
            //         email: true,
            //         contato: true
            //     }
            // })
    
            return { createUser }
        }catch(err){
            console.error("CreateUserService Error:", err);
            throw new Error("Ocorreu um erro ao criar o usuário");        
        }

    }
}

export { CreateUserService }; 
