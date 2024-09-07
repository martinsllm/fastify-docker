
import server from '../server';
import { UserRoutes } from './UserRoutes';

export const routes = async () => {

    server.register(UserRoutes, {
        prefix: '/user'
    });

};