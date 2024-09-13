import 'dotenv/config'
import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import type { JwtPayload, SignOptions } from 'jsonwebtoken'

const secret = process.env.JWT_SECRET as string

const sign = (payload: { id: number; email: string }) => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '6h',
  }

  return jwt.sign(payload, secret, jwtConfig)
}

const verifyToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: any
) => {
  const token = request.headers['authorization']

  if (!token) return reply.status(401).send({ message: 'Unauthorized!' })

  done()
}

const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, secret) as JwtPayload
  return decoded.id
}

export { sign, verifyToken, decodeToken }
