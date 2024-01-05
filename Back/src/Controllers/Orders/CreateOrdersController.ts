import { Request, Response } from "express";
import { CreateOrdersService } from "../../Services/Orders/CreateOrdersService";

class CreateOrdersController {
    async handle(req: Request, res: Response){

        try{
            const { name, profissional, data, horario, services } = req.body;

            if (!name || !profissional || !data || !horario ) {
                return res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos.' });
            }
    
            const createOrdersService = new CreateOrdersService();
    
            const order = await createOrdersService.execute({
                name,
                profissional,
                data,
                horario,
                services
            });
    
            return res.json(order);
        }catch(err){
            console.error('Erro ao criar pedido:', err);
            return res.status(500).json({ err: 'Erro interno ao processar a solicitação.' });
        }

    }
}
 
export { CreateOrdersController };
