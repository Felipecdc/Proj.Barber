import prismaClient from "../../prisma";

interface DeleteRequest {
    user_id: string
}

class DeleteUserService {
    async execute({ user_id }: DeleteRequest){

        const userSearch = await prismaClient.user.findFirst({
            where: {id: user_id},
        })

        if (!userSearch) {
            return { error: "User not found" };
        }

        try {

            const historicoDelete = await prismaClient.walletTransaction.delete({
                where: { wallet_id: userSearch.wallet_id },
            });

            const userDelete = await prismaClient.user.delete({
                where: { id: userSearch.id },
            });

            const walletDelete = await prismaClient.wallet.delete({
                where: { id: userSearch.wallet_id },
            });

            return { message: "User deleted successfully" };
        } catch (error) {
            return { error: "Error deleting user", details: error.message };
        }

    }
}

export { DeleteUserService };