import type User from '../database/models/User'
import type { LoginDTO } from '../repositories/dtos/LoginDTO'
import type { IUserRepository } from '../repositories/interfaces/IUserRepository'
import UserRepository from '../repositories/UserRepository'
import type { ICryptoService } from './interfaces/ICryptoService'
import CryptoService from './CryptoService'
import type { IAuthService } from './interfaces/IAuthService'
import { sign } from './JWTService'

class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository
  private readonly cryptoService: ICryptoService

  constructor() {
    this.userRepository = new UserRepository()
    this.cryptoService = new CryptoService()
  }

  async login(login: LoginDTO): Promise<string | null> {
    const user = await this.validateEmail(login.email)

    if (user) {
      const checkPassword = await this.checkPassword(user, login.password)
      const token = checkPassword ? await this.generateToken(user) : null
      return token
    }

    return null
  }

  async validateEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getByEmail(email)
    return user
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    return await this.cryptoService.verifyPassword(password, user.password)
  }

  async generateToken(user: User): Promise<string> {
    return sign({ id: user.id, email: user.email })
  }
}

export default AuthService
