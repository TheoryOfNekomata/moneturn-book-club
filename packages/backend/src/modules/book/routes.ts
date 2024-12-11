import { FastifyInstance } from 'fastify';
import * as bookController from './controller';

export const addRoutes = (server: FastifyInstance) => {
  return server
    .route({
      method: 'GET',
      url: '/api/books',
      handler: bookController.getFindAllBooks,
    })
    .route({
      method: 'GET',
      url: '/api/books/:bookId',
      handler: bookController.getFindOneBook,
    })
    .route({
      method: 'POST',
      url: '/api/books',
      handler: bookController.postCreateNewBook,
    })
    .route({
      method: 'PUT',
      url: '/api/books/:bookId',
      handler: bookController.putUpdateExistingBook,
    })
    .route({
      method: 'DELETE',
      url: '/api/books/:bookId',
      handler: bookController.deleteExistingBook,
    });
};
