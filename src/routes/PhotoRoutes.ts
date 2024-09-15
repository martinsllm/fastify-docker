import type { FastifyInstance } from 'fastify'
import { verifyToken } from '../services/JWTService'
import multerConfig from '../middlewares/Multer'
import multer from 'fastify-multer'
import PhotoController from '../controllers/PhotoController'
import { decode } from 'jsonwebtoken'

export async function PhotoRoutes(fastify: FastifyInstance) {
  const photoController = new PhotoController()

  fastify.register(multer.contentParser)

  fastify.addHook('preHandler', verifyToken)

  fastify.get<{ Params: { userId: number } }>(
    '/user/:userId',
    async (request, reply) => {
      const { userId } = request.params
      const photos = await photoController.getByUser(userId)

      return reply.send(photos)
    }
  )

  fastify.post(
    '/',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      const token = request.headers.authorization
      const decodedToken = decode(token)

      const uploadedPhoto = await photoController.create(
        request.file,
        decodedToken.id
      )
      return reply.send(uploadedPhoto)
    }
  )
}
