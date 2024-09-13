import UserController from '../controllers/UserController'
import type { UserDTO } from '../repositories/dtos/UserDTO'
import { verifyToken } from '../services/JWTService'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { userValidation } from '../middlewares/UserValidationSchema'

export const UserRoutes: FastifyPluginAsyncZod = async fastify => {
  const userController = new UserController()

  fastify.post<{ Body: UserDTO }>(
    '/',
    userValidation,
    async (request, reply) => {
      const createdUser = await userController.create(request.body)
      if (!createdUser)
        return reply.status(400).send({ message: 'Error in user register!' })

      return reply.status(201).send()
    }
  )

  fastify.addHook('preHandler', verifyToken)

  fastify.get('/', async (request, reply) => {
    const users = await userController.get()
    return reply.send(users)
  })

  fastify.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const { id } = request.params

    const user = await userController.getById(+id)
    if (!user) return reply.status(404).send({ message: 'User not found!' })

    return reply.send(user)
  })

  fastify.put<{ Body: UserDTO; Params: { id: number } }>(
    '/:id',
    userValidation,
    async (request, reply) => {
      const { id } = request.params

      const updatedUser = await userController.update(request.body, +id)
      if (!updatedUser)
        return reply.status(400).send({ message: 'Error in user update!' })

      return reply.status(204).send()
    }
  )

  fastify.delete<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const { id } = request.params

    const deletedUser = await userController.delete(+id)
    if (!deletedUser)
      return reply.status(400).send({ message: 'Error in user removal!' })

    return reply.status(204).send()
  })
}
