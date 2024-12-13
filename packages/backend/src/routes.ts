import { FastifyInstance } from 'fastify';
import { addRoutes as addBookRoutes } from './modules/book';
import { addRoutes as addAuthorRoutes } from './modules/author';

export const addRoutes = (server: FastifyInstance) => {
  const mountedRoutes = [
    addBookRoutes,
    addAuthorRoutes,
  ];

  return mountedRoutes.reduce(
    (serverWithAddedRoutes, addRoutesFn) => (
      addRoutesFn(serverWithAddedRoutes)
    ),
    server
  );
};
