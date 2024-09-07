import server from './server';
import 'dotenv/config';

const PORT = process.env.NODE_DOCKER_PORT || 8080;

server.listen({ port: +PORT, host: "0.0.0.0" }, (err, address) => {
    console.log(`Server listening on ${address}`);
});