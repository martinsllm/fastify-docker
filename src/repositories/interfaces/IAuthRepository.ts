import type User from '../../database/models/User'
import type { LoginDTO } from '../dtos/LoginDTO'

export interface IAuthRepository {
  login(login: LoginDTO): Promise<string | null>

  validateEmail(email: string): Promise<User | null>

  checkPassword(user: User, password: string): Promise<boolean>

  generateToken(user: User): Promise<string>
}
