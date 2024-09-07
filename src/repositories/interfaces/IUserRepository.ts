import User from '../../database/models/User';
import { UserDTO } from '../dtos/UserDTO';

export interface IUserRepository {
    get(): Promise<User[]>;

    getById(id: number): Promise<User | null>;
    
    create(user: UserDTO): Promise<User>;
}