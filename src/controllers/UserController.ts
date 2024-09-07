import { UserDTO } from '../repositories/dtos/UserDTO';
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

    async getById(id: number) {
        const user = await this.userRepository.getById(+id);
        return user;
    }

    async create(user: UserDTO) {
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    }
}

export default UserController;