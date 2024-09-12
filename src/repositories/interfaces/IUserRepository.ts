import type User from '../../database/models/User'
import type { CreateUserDTO } from '../dtos/CreateUserDTO'
import type { UpdateUserDTO } from '../dtos/UpdateUserDTO'

export interface IUserRepository {
  get(): Promise<User[]>

  getById(id: number): Promise<User | null>

  create(user: CreateUserDTO): Promise<User>

  update(user: UpdateUserDTO, id: number): Promise<User | null>

  delete(id: number): Promise<User | null>
}
