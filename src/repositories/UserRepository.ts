import User from '../database/models/User';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
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

    async create(user: CreateUserDTO): Promise<User> {
        const createdUser = await User.create({ ...user });
        return createdUser;
    }

    async update(user: UpdateUserDTO, id: number): Promise<User | null> {
        const foundUser = await this.getById(id);

        if(foundUser != null) {
            await User.update({ ...user }, {
                where: { id }
            });
        }

        return foundUser;
    }

    async delete(id: number): Promise<User | null> {
        const foundUser = await this.getById(id);

        if(foundUser != null) {
            await User.destroy({
                where: {
                    id
                }
            })
        }

        return foundUser;
    }

}

export default UserRepository;