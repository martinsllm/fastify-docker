import type { FastifyInstance } from 'fastify'
import type { LoginDTO } from '../repositories/dtos/LoginDTO'
import AuthController from '../controllers/AuthController'

export async function AuthRoute(fastify: FastifyInstance) {
  const authController = new AuthController()

  fastify.post<{ Body: LoginDTO }>('/', async (request, reply) => {
    const token = await authController.login(request.body)
    if (!token) return reply.status(401).send({ message: 'Unauthorized!' })

    return reply.send({ token })
  })
}
