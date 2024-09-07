import { CreateUserDTO } from '../repositories/dtos/CreateUserDTO';
import { UpdateUserDTO } from '../repositories/dtos/UpdateUserDTO';
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

    async create(user: CreateUserDTO) {
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    }

    async update(user: UpdateUserDTO, id: number) {
        const updatedUser = await this.userRepository.update(user, id);
        return updatedUser;
    }

    async delete(id: number) {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
    }
}

export default UserController;