import fastify from 'fastify';
import * as authorController from './controller';

export const addRoutes = (server: fastify.FastifyInstance) => {
  return server
    .route({
      method: 'GET',
      url: '/api/authors',
      handler: authorController.getFindAllAuthors,
    })
    .route({
      method: 'GET',
      url: '/api/authors/:authorId',
      handler: authorController.getFindOneAuthor,
    })
    .route({
      method: 'POST',
      url: '/api/authors',
      handler: authorController.postCreateNewAuthor,
    })
    .route({
      method: 'PUT',
      url: '/api/authors/:authorId',
      handler: authorController.putUpdateExistingAuthor,
    })
    .route({
      method: 'DELETE',
      url: '/api/authors/:authorId',
      handler: authorController.deleteExistingAuthor,
    });
};