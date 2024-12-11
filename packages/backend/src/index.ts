import { createServer } from './server';
import { addRoutes } from './routes';
import * as config from './config';

const main = async (args: typeof config) => {
  const server = createServer({
    logger: args.meta.env !== 'test',
  });

  addRoutes(server);

  server.listen({ port: args.meta.port, host: args.meta.host }, (err, address) => {
    if (err) {
      server.log.error(err.message);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
};

void main(config);
