import User from '../database/models/User';
import { IUserRepository } from './interfaces/IUserRepository';

class UserRepository implements IUserRepository {

    async get(): Promise<User[]> {
        const users = await User.findAll();
        return users;
    }

    async create(user: User): Promise<User> {
        const createdUser = await User.create({...user});
        return createdUser;
    }

}

export default UserRepository;