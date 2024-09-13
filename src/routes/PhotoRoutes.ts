import type { FastifyInstance } from 'fastify'
import { verifyToken } from '../services/JWTService'
import multerConfig from '../middlewares/Multer'
import multer from 'fastify-multer'

export async function PhotoRoutes(fastify: FastifyInstance) {
  fastify.register(multer.contentParser)

  fastify.addHook('preHandler', verifyToken)

  fastify.post(
    '/',
    { preHandler: multer(multerConfig).single('file') },
    async (request, reply) => {
      return reply.send(request.file)
    }
  )
}
