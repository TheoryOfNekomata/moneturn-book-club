import { createServer } from './server';
import { addRoutes } from './routes';

interface Args {
  port: number;
  host: string;
  env: string;
}

const main = async (args: Args) => {
  const {
    port,
    host,
    env,
  } = args;
  const server = createServer({
    logger: env !== 'test',
  });

  addRoutes(server);

  server.listen({ port, host }, (err, address) => {
    if (err) {
      server.log.error(err.message);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
};

void main({
  port: Number(process.env.PORT ?? '8080'),
  host: process.env.HOST ?? '0.0.0.0',
  env: process.env.NODE_ENV ?? 'development',
});
