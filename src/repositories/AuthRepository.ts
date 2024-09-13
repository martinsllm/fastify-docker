import type User from '../database/models/User'
import { sign } from '../services/JWTService'
import { verifyPassword } from '../services/PasswordCrypto'
import type { LoginDTO } from './dtos/LoginDTO'
import type { IAuthRepository } from './interfaces/IAuthRepository'
import type { IUserRepository } from './interfaces/IUserRepository'
import UserRepository from './UserRepository'

class AuthRepository implements IAuthRepository {
  private readonly userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
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
    return await verifyPassword(password, user.password)
  }

  async generateToken(user: User): Promise<string> {
    return sign({ id: user.id, email: user.email })
  }
}

export default AuthRepository
