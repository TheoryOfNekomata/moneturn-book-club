import fastify, { FastifyHttpOptions, FastifyInstance } from 'fastify';
import * as http from 'http';

export const createServer = <T extends http.Server>(opts = {} as FastifyHttpOptions<T>) => {
  const server = (fastify as Function)(opts);

  return server as FastifyInstance;
};
