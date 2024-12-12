import { FastifyInstance } from 'fastify';
import * as authorController from './controller';

export const addRoutes = (server: FastifyInstance) => {
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
      method: 'GET',
      url: '/api/authors/:authorId/books',
      handler: authorController.getFindAllAuthorBooks,
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
