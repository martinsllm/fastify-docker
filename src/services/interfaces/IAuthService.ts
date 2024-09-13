import type User from '../../database/models/User'
import type { LoginDTO } from '../../repositories/dtos/LoginDTO'

export interface IAuthService {
  login(login: LoginDTO): Promise<string | null>

  validateEmail(email: string): Promise<User | null>

  checkPassword(user: User, password: string): Promise<boolean>

  generateToken(user: User): Promise<string>
}
