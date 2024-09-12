import Fastify from 'fastify'
import { routes } from '../routes/Router'

const server = Fastify({})

server.register(routes)

export default server
