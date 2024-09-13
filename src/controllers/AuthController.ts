import AuthRepository from '../repositories/AuthRepository'
import type { LoginDTO } from '../repositories/dtos/LoginDTO'
import type { IAuthRepository } from '../repositories/interfaces/IAuthRepository'

class AuthController {
  private readonly authRepository: IAuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async login(login: LoginDTO) {
    const verifyAccess = await this.authRepository.login(login)
    return verifyAccess
  }
}

export default AuthController
