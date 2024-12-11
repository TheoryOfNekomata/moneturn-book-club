import fastify, { FastifyHttpOptions } from 'fastify';
import * as http from 'http';

export const createServer = <T extends http.Server>(opts = {} as FastifyHttpOptions<T>) => {
  const server = fastify(opts);

  return server;
};
