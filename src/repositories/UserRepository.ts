import User from '../database/models/User';
import { UserDTO } from './dtos/UserDTO';
import { IUserRepository } from './interfaces/IUserRepository';

class UserRepository implements IUserRepository {

    async get(): Promise<User[]> {
        const users = await User.findAll();
        return users;
    }

    async getById(id: number): Promise<User | null> {
        const user = await User.findOne({
            where: { id }
        });

        return user;
    }

    async create(user: UserDTO): Promise<User> {
        const createdUser = await User.create({
            ...user
        });
        
        return createdUser;
    }

}

export default UserRepository;