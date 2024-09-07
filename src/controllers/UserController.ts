import User from '../database/models/User';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';

class UserController {

    private readonly userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async get() {
        const users = await this.userRepository.get();
        return users;
    }

    async create(user: User) {
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    }
}

export default UserController;