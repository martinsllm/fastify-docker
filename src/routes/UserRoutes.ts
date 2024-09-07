import { FastifyInstance } from 'fastify';
import UserController from '../controllers/UserController';
import { UserDTO } from '../repositories/dtos/UserDTO';

export async function UserRoutes(fastify: FastifyInstance) {

    const userController = new UserController();

    fastify.get('/', async (request, reply) => {
        const users = await userController.get();
        return reply.send(users);
    });

    fastify.get<{Params: { id: number }}>('/:id', async (request, reply) => {
        const { id } = request.params;

        const user = await userController.getById(+id);
        if(!user) return reply.status(404).send({message: 'User not found!'});

        return reply.send(user);
    });

    fastify.post<{Body: UserDTO}>('/', async (request, reply) => {
        const createdUser = await userController.create(request.body);
        return reply.send(createdUser);
    });
    
}