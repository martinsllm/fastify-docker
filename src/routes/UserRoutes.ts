import { FastifyInstance } from 'fastify';
import UserController from '../controllers/UserController';
import User from '../database/models/User';

export async function UserRoutes(fastify: FastifyInstance) {

    const userController = new UserController();

    fastify.get('/', async (request, reply) => {
        const users = await userController.get();
        return reply.send(users);
    });

    fastify.post<{Body: User}>('/', async (request, reply) => {
        const createdUser = await userController.create(request.body);
        return reply.send(createdUser);
    });
    
}