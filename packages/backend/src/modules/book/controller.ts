import { constants } from 'http2';
import fastify from 'fastify';
import * as v from 'valibot';
import * as bookService from './service';
import { Book, BookSchema } from '../../models';

export const getFindAllBooks: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingBooks: Book[];
  try {
    existingBooks = await bookService.findAllBooks();
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(existingBooks);
};

export const getFindOneBook: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingBook: Book | undefined;
  try {
    existingBook = await bookService.findOneBook(request.params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingBook === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  reply.send(existingBook);
};

export const postCreateNewBook: fastify.RouteHandlerMethod = async (request, reply) => {
  let newBookData: Book;
  try {
    newBookData = await v.parseAsync(BookSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let newBook: Book | undefined;
  try {
    newBook = await bookService.createNewBook(newBookData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_CREATED).send(newBook);
};

export const putUpdateExistingBook: fastify.RouteHandlerMethod = async (request, reply) => {
  let newBookData: Book;
  try {
    newBookData = await v.parseAsync(BookSchema, request.body);
  } catch {
    reply.status(constants.HTTP_STATUS_BAD_REQUEST).send();
    return;
  }

  let updateFn: ((id: Book) => Promise<Book>) | undefined;
  try {
    updateFn = await bookService.updateExistingBook(request.params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof updateFn === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send();
    return;
  }

  let updatedBook: Book | undefined;
  try {
    updatedBook = await updateFn(newBookData);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.send(updatedBook);
};

export const deleteExistingBook: fastify.RouteHandlerMethod = async (request, reply) => {
  let existingBook: Book | undefined;
  try {
    existingBook = await bookService.findOneBook(request.params.bookId);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  if (typeof existingBook === 'undefined') {
    reply.status(constants.HTTP_STATUS_NOT_FOUND).send({
      message: 'Not Found',
    });
    return;
  }

  try {
    await bookService.deleteExistingBook(existingBook.id);
  } catch {
    reply.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    return;
  }

  reply.status(constants.HTTP_STATUS_NO_CONTENT).send();
};
