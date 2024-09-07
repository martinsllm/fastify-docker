import User from '../../database/models/User';

export interface IUserRepository {
    get(): Promise<User[]>;
    
    create(user: User): Promise<User>;
}