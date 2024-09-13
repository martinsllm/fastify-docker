import AuthService from '../services/AuthService'
import type { LoginDTO } from '../repositories/dtos/LoginDTO'
import type { IAuthService } from '../services/interfaces/IAuthService'

class AuthController {
  private readonly authService: IAuthService

  constructor() {
    this.authService = new AuthService()
  }

  async login(login: LoginDTO) {
    const verifyAccess = await this.authService.login(login)
    return verifyAccess
  }
}

export default AuthController
