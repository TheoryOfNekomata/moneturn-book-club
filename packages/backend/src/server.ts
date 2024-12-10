import fastify from 'fastify';

export const createServer = () => {
  const server = fastify({

  });

  return server;
};
