import type User from '../../database/models/User'
import type { UserDTO } from '../dtos/UserDTO'

export interface IUserRepository {
  get(): Promise<User[]>

  getById(id: number): Promise<User | null>

  getByEmail(email: string): Promise<User | null>

  create(user: UserDTO): Promise<User>

  update(user: UserDTO, id: number): Promise<User | null>

  delete(id: number): Promise<User | null>
}
