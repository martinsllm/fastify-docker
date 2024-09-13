import server from '../http/server'
import { AuthRoute } from './AuthRoute'
import { PhotoRoutes } from './PhotoRoutes'
import { UserRoutes } from './UserRoutes'

export const routes = async () => {
  server.register(UserRoutes, {
    prefix: '/user',
  })

  server.register(PhotoRoutes, {
    prefix: '/photo',
  })

  server.register(AuthRoute, {
    prefix: '/login',
  })
}
